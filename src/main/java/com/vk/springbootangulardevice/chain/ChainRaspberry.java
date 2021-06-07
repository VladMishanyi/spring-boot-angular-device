//package com.vk.springbootangulardevice.chain;
//
//import com.vk.springbootangulardevice.modbus.entity.ModbusBodyQuery;
//import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
//import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
//import com.vk.springbootangulardevice.tasks.TaskMB110_1TD;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.stereotype.Component;
//
//import java.util.LinkedList;
//import java.util.Queue;
//
//@Component
//@ComponentScan(basePackages = {"com.vk.springbootangulardevice.tasks", "com.vk.springbootangulardevice.service"})
//public class ChainRaspberry extends Thread{
//
//    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
//
//    private final RepositoryRaspberry repositoryRaspberry;
//
//    @Autowired
//    public ChainRaspberry(final RepositoryRaspberry repositoryRaspberry){
//        this.repositoryRaspberry = repositoryRaspberry;
//        this.start();
//    }
//
//    @Override
//    public void run(){
//        try {
//            while (!this.isInterrupted()){
//                repositoryRaspberry.raspberryReadGPIO27();
//                Thread.sleep(100);
//            }
//        }catch (InterruptedException e){
//                String message = e.getMessage();
//                LOGGER.error("Interrupted"+this.getClass()+"thread --"+message);
//                System.out.println("Interrupted"+this.getClass()+"thread --"+message);
//        }
//    }
//}
