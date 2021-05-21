package com.vk.springbootangulardevice.chain;

import com.vk.springbootangulardevice.modbus.entity.ModbusBodyQuery;
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

    private final TaskMB110_1TD taskMB110_1TD;

    private final ServiceMB110_1TD serviceMB110_1TD;

    @Autowired
    public ChainModbus(final TaskMB110_1TD taskMB110_1TD, final ServiceMB110_1TD serviceMB110_1TD){
        this.taskMB110_1TD = taskMB110_1TD;
        this.serviceMB110_1TD = serviceMB110_1TD;
//        this.start();
    }

    @Override
    public void run(){
        try {
            while (!this.isInterrupted()){
//                taskMB110_1TD.readModbusAndWriteToTable();
                serviceMB110_1TD.modbusReadDataFromRegister0();

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
                    case 0 : iModbusServiceRightWinderPLC110.writeDataToRegister0(body.getValueFloat()); break;
                    case 1 : iModbusServiceRightWinderPLC110.writeDataToRegister1(body.getValueFloat()); break;
                    case 2 : iModbusServiceRightWinderPLC110.writeDataToRegister2(body.getValueFloat()); break;
                    case 3 : iModbusServiceRightWinderPLC110.writeDataToRegister3(body.getValueFloat()); break;
                    case 4 : iModbusServiceRightWinderPLC110.writeDataToRegister4(body.getValueInt()); break;
                    case 5 : iModbusServiceRightWinderPLC110.writeDataToRegister5(body.getValueInt()); break;
                    case 6 : iModbusServiceLeftWinderPLC110.writeDataToRegister0(body.getValueFloat()); break;
                    case 7 : iModbusServiceLeftWinderPLC110.writeDataToRegister1(body.getValueFloat()); break;
                    case 8 : iModbusServiceLeftWinderPLC110.writeDataToRegister2(body.getValueFloat()); break;
                    case 9 : iModbusServiceLeftWinderPLC110.writeDataToRegister3(body.getValueFloat()); break;
                    case 10 : iModbusServiceLeftWinderPLC110.writeDataToRegister4(body.getValueInt()); break;
                    case 11 : iModbusServiceLeftWinderPLC110.writeDataToRegister5(body.getValueInt()); break;
                    default: {
                        LOGGER.error("Wrong command in ChainModbus --"+body.getQueryNumber());
                        System.out.println("Wrong command in ChainModbus --"+body.getQueryNumber());
                        break;
                    }
                }
            }

            if (DeviceModelRightWindingPLC110.getDeviceValuesRegister5() != 0){
                LOGGER.error("ALARM in right winder № --"+DeviceModelRightWindingPLC110.getDeviceValuesRegister5());
                System.out.println("ALARM in right winder № --"+DeviceModelRightWindingPLC110.getDeviceValuesRegister5());
            }

            if (DeviceModelLeftWindingPLC110.getDeviceValuesRegister5() != 0){
                LOGGER.error("ALARM in left winder № --"+DeviceModelLeftWindingPLC110.getDeviceValuesRegister5());
                System.out.println("ALARM in left winder № --"+DeviceModelLeftWindingPLC110.getDeviceValuesRegister5());
            }
        }
    }
}
