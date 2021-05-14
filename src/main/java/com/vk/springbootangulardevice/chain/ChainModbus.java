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

@Component
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.tasks", "com.vk.springbootangulardevice.service"})
public class ChainModbus extends Thread{

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    public static Queue<ModbusBodyQuery> modbusBodyQueryQueue = new LinkedList<>();

    private final TaskMB110_1TD taskMB110_1TD;

    private final ServiceMB110_1TD serviceMB110_1TD;

    @Autowired
    public ChainModbus(final TaskMB110_1TD taskMB110_1TD, final ServiceMB110_1TD serviceMB110_1TD){
        this.taskMB110_1TD = taskMB110_1TD;
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.start();
    }

    @Override
    public void run(){
        try {
            while (!this.isInterrupted()){
//                taskMB110_1TD.readModbusAndWriteToTable();
                serviceMB110_1TD.modbusReadDataFromRegisterAll();
                Thread.sleep(500);
            }
        }catch (InterruptedException e){
                String message = e.getMessage();
                LOGGER.error("Interrupted"+this.getClass()+"thread --"+message);
                System.out.println("Interrupted"+this.getClass()+"thread --"+message);
        }
    }
}
