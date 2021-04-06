package com.vk.springbootangulardevice.config;

import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.serotonin.modbus4j.BatchRead;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

@Configuration
@ComponentScan(basePackages = {"com.vk.springbootangulardevice"})
public class ConfigurationRoot {

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public BatchRead<Integer> batchRead(){
        return new BatchRead<>();
    }

    public BatchRead<Integer> getNewBatchRead(){
        return new AnnotationConfigWebApplicationContext().getBean(BatchRead.class);
    }

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public GpioController gpioController(){
        return GpioFactory.getInstance();
    }
}
