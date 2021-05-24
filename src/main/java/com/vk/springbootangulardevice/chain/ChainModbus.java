package com.vk.springbootangulardevice.chain;

import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.entity.ModbusBodyQuery;
import com.vk.springbootangulardevice.model.JsonFloat;
import com.vk.springbootangulardevice.model.JsonString;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import com.vk.springbootangulardevice.tasks.TaskMB110_1TD;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Component
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.tasks", "com.vk.springbootangulardevice.service"})
public class ChainModbus extends Thread{

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    public static Queue<ModbusBodyQuery> modbusBodyQueryQueue = new LinkedBlockingQueue<>();
    private final DeviceModelMB110_1TD deviceModelMB110_1TD;
    private final ServiceMB110_1TD serviceMB110_1TD;

    @Autowired
    public ChainModbus(final ServiceMB110_1TD serviceMB110_1TD, final DeviceModelMB110_1TD deviceModelMB110_1TD){
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.start();
    }

    @Override
    public void run(){
        try {
            while (!this.isInterrupted()){
                DeviceModelMB110_1TD device = serviceMB110_1TD.modbusReadDataFromRegisterAll();
//                serviceMB110_1TD.messageRealMeasuringValueFromSensor(device);
                checkQueryQueue();
                Thread.sleep(100);
            }
        }catch (InterruptedException e){
                String message = e.getMessage();
                LOGGER.error("Interrupted"+this.getClass()+"thread --"+message);
                System.out.println("Interrupted"+this.getClass()+"thread --"+message);
        }
    }

    public void checkQueryQueue(){
        if (modbusBodyQueryQueue.size() > 0){
            while (!modbusBodyQueryQueue.isEmpty()){
                ModbusBodyQuery body = modbusBodyQueryQueue.poll();
                switch (body.getQueryNumber()){
                    case 1 : serviceMB110_1TD.modbusWriteDataToRegister1(body.getValueShort()); break;
                    case 2 : serviceMB110_1TD.modbusWriteDataToRegister2(body.getValueShort()); break;
                    case 3 : serviceMB110_1TD.modbusWriteDataToRegister3(body.getValueShort()); break;
                    case 4 : serviceMB110_1TD.modbusWriteDataToRegister4(body.getValueShort()); break;
                    case 5 : serviceMB110_1TD.modbusWriteDataToRegister5(body.getValueFloat()); break;
                    case 6 : serviceMB110_1TD.modbusWriteDataToRegister6(body.getValueFloat()); break;
                    case 7 : serviceMB110_1TD.modbusWriteDataToRegister7(body.getValueFloat()); break;
                    default: {
                        LOGGER.error("Wrong command in ChainModbus --"+body.getQueryNumber());
                        System.out.println("Wrong command in ChainModbus --"+body.getQueryNumber());
                        break;
                    }
                }
            }
        }
    }
}
