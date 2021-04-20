package com.vk.springbootangulardevice.chain;

import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.lib.RiseFront;
import com.vk.springbootangulardevice.modbus.lib.TimerON;
import com.vk.springbootangulardevice.model.ModelRaspberry;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseRecipe;
import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
@ComponentScan(basePackages =
        {"com.vk.springbootangulardevice.service",
        "com.vk.springbootangulardevice.repository",
        "com.vk.springbootangulardevice.modbus",
        "com.vk.springbootangulardevice.model"})
public class ChainProgram extends Thread{

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private ServiceMB110_1TD serviceMB110_1TD;
    private RepositoryRaspberry repositoryRaspberry;
    private RiseFront riseFront = new RiseFront();
    private TimerON timerON = new TimerON();
    private DeviceModelMB110_1TD deviceModelMB110_1TD;
    private ModelRaspberry modelRaspberry;
    private DeviceToTableMB110_1TD deviceToTableMB110_1TD;
    private TableModelRecipe tableModelRecipe = new TableModelRecipe("empty", 10);
    private RepositoryDatabaseRecipe repositoryDatabaseRecipe;

    @Autowired
    public ChainProgram(final ServiceMB110_1TD serviceMB110_1TD,
                        final RepositoryRaspberry repositoryRaspberry,
                        final DeviceModelMB110_1TD deviceModelMB110_1TD,
                        final ModelRaspberry modelRaspberry,
                        final DeviceToTableMB110_1TD deviceToTableMB110_1TD,
                        final RepositoryDatabaseRecipe repositoryDatabaseRecipe) {
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.repositoryRaspberry = repositoryRaspberry;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.modelRaspberry = modelRaspberry;
        this.deviceToTableMB110_1TD = deviceToTableMB110_1TD;
        this.repositoryDatabaseRecipe = repositoryDatabaseRecipe;
        this.start();
    }

    @Override
    public void run() {
        try {
            while (!this.isInterrupted()){

                timerON.setEnable(modelRaspberry.isGpio27());
                timerON.setTime(tableModelRecipe.getTime());


                riseFront.setInputFront(modelRaspberry.isGpio27());


                if (riseFront.isOutputResult()){
                    TableModelRecipe tableModelRecipeInner = repositoryDatabaseRecipe.findLastValueByDate();
                    if (tableModelRecipeInner == null) repositoryDatabaseRecipe.saveAndFlush(tableModelRecipe);
                    if (tableModelRecipeInner != null) tableModelRecipe = tableModelRecipeInner;
                }


                if (modelRaspberry.isGpio27() && (timerON.getTime() > 0) && !timerON.isEndTime()){
                    serviceMB110_1TD.websocketSendDevice(deviceModelMB110_1TD);
                    TableModelMB110_1TD tableModelMB110_1TD = deviceToTableMB110_1TD.convert(deviceModelMB110_1TD);
                    tableModelMB110_1TD.setRecipe(tableModelRecipe);
                    serviceMB110_1TD.databaseAddTableDevice(tableModelMB110_1TD);
                }


                Thread.sleep(100);
            }
        }catch (InterruptedException e){
            String message = e.getMessage();
            LOGGER.error("Interrupted"+this.getClass()+"thread --"+message);
            System.out.println("Interrupted"+this.getClass()+"thread --"+message);
        }
    }
}
