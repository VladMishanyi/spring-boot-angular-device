package com.vk.springbootangulardevice.chain;

import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.lib.RiseFront;
import com.vk.springbootangulardevice.modbus.lib.TimerON;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonString;
import com.vk.springbootangulardevice.model.ModelRaspberry;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseRecipe;
//import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceRecipe;
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

    private final ServiceMB110_1TD serviceMB110_1TD;
    private final RiseFront riseFront = new RiseFront();
    private final TimerON timerON = new TimerON();
    private final DeviceModelMB110_1TD deviceModelMB110_1TD;
    private final ModelRaspberry modelRaspberry;
    private final DeviceToTableMB110_1TD deviceToTableMB110_1TD;
    private TableModelRecipe tableModelRecipe = new TableModelRecipe("empty", 1);
    private final ServiceRecipe serviceRecipe;
    private static int couterChart = 0;

    @Autowired
    public ChainProgram(final ServiceMB110_1TD serviceMB110_1TD,
                        final DeviceModelMB110_1TD deviceModelMB110_1TD,
                        final ModelRaspberry modelRaspberry,
                        final DeviceToTableMB110_1TD deviceToTableMB110_1TD,
                        final ServiceRecipe serviceRecipe) {
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.modelRaspberry = modelRaspberry;
        this.deviceToTableMB110_1TD = deviceToTableMB110_1TD;
        this.serviceRecipe = serviceRecipe;
        this.start();
    }

    @Override
    public void run() {
        try {
            while (!this.isInterrupted()){
                //just to emulate real input
//                modelRaspberry.setGpio27(true);

                timerON.setEnable(modelRaspberry.isGpio27());
                timerON.setTime(tableModelRecipe.getTime() * (long) 60);
                riseFront.setInputFront(modelRaspberry.isGpio27());

                if (riseFront.isOutputResult()){
                    TableModelRecipe tableModelRecipeInner = serviceRecipe.databaseFindLastValueByDate();
                    if (tableModelRecipeInner == null) serviceRecipe.databaseAddTableDevice(tableModelRecipe);
                    if (tableModelRecipeInner != null) tableModelRecipe = tableModelRecipeInner;
                }

                if (modelRaspberry.isGpio27() && (timerON.getTime() > 0) && !timerON.isEndTime()){
                    if (couterChart >= 9){
                        serviceMB110_1TD.websocketSendDevice(deviceModelMB110_1TD);
                        TableModelMB110_1TD tableModelMB110_1TD = deviceToTableMB110_1TD.convert(deviceModelMB110_1TD);
                        tableModelMB110_1TD.setRecipe(tableModelRecipe);
                        serviceMB110_1TD.databaseAddTableDevice(tableModelMB110_1TD);
                        couterChart = 0;
                    }
                }

                serviceMB110_1TD.raspberryWriteGPI26(!modelRaspberry.isGpio27());
                serviceMB110_1TD.raspberryWriteGPI28(!timerON.isEndTime());
                serviceMB110_1TD.messageTimerStatus(new JsonBoolean(timerON.isEnable()));
                serviceMB110_1TD.messageContactStatus(new JsonBoolean(modelRaspberry.isGpio27()));
                if (timerON.isEnable()){
                    serviceMB110_1TD.messageTextStatus(new JsonString("Випробування почато"));
                }else {
                    serviceMB110_1TD.messageTextStatus(new JsonString("Очікую випробування"));
                }

                couterChart++;
                Thread.sleep(100);
            }
        }catch (InterruptedException e){
            String message = e.getMessage();
            LOGGER.error("Interrupted"+this.getClass()+"thread --"+message);
            System.out.println("Interrupted"+this.getClass()+"thread --"+message);
        }
    }
}
