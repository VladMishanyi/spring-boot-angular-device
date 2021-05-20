package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.chain.ChainModbus;
import com.vk.springbootangulardevice.chain.ChainProgram;
import com.vk.springbootangulardevice.database.convertor.DeviceToTableMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.model.ModelRaspberry;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.service.ServiceRecipe;
import com.vk.springbootangulardevice.tasks.TaskMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ComponentScan(basePackages = {"com.vk.springbootangulardevice"})
public class WatchDogController {
    private final ServiceMB110_1TD serviceMB110_1TD;
    private ChainModbus chainModbus;
    private ChainProgram chainProgram;
    //    private ChainRaspberry chainRaspberry;
    private final TaskMB110_1TD taskMB110_1TD;
    //    private final RepositoryRaspberry repositoryRaspberry;
    private final DeviceModelMB110_1TD deviceModelMB110_1TD;
    private final ModelRaspberry modelRaspberry;
    private final DeviceToTableMB110_1TD deviceToTableMB110_1TD;
    private final ServiceRecipe serviceRecipe;

    @Autowired
    public WatchDogController(final ServiceMB110_1TD serviceMB110_1TD,
                              final ChainModbus chainModbus,
                              final ChainProgram chainProgram,
//                              final ChainRaspberry chainRaspberry,
                              final TaskMB110_1TD taskMB110_1TD,
//                              final RepositoryRaspberry repositoryRaspberry,
                              final DeviceModelMB110_1TD deviceModelMB110_1TD,
                              final ModelRaspberry modelRaspberry,
                              final DeviceToTableMB110_1TD deviceToTableMB110_1TD,
                              final ServiceRecipe serviceRecipe) {
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.chainModbus = chainModbus;
        this.chainProgram = chainProgram;
//        this.chainRaspberry = chainRaspberry;
        this.taskMB110_1TD = taskMB110_1TD;
//        this.repositoryRaspberry = repositoryRaspberry;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.modelRaspberry = modelRaspberry;
        this.deviceToTableMB110_1TD = deviceToTableMB110_1TD;
        this.serviceRecipe = serviceRecipe;
    }

    @Scheduled(fixedRate = 1000*60)
    private void loopModbus(){
        if (!chainModbus.isAlive()){
            chainModbus = new ChainModbus(taskMB110_1TD, serviceMB110_1TD);
        }
    }

    @Scheduled(fixedRate = 1000*60)
    private void loopProgram(){
        if (!chainProgram.isAlive()){
            chainProgram = new ChainProgram(serviceMB110_1TD, deviceModelMB110_1TD, modelRaspberry, deviceToTableMB110_1TD, serviceRecipe);
        }
    }

//    @Scheduled(fixedRate = 1000*60)
//    private void loopRaspberry(){
//        if (!chainRaspberry.isAlive()){
//            chainRaspberry = new ChainRaspberry(repositoryRaspberry);
//        }
//    }
}
