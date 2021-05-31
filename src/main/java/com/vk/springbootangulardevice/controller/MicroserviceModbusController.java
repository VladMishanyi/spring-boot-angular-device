package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelTRM251;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.modbus.device"})
@RequestMapping(value = "/modbus/mv110-1td")
public class MicroserviceModbusController {

    private final DeviceModelMB110_1TD deviceModel;

    @Autowired
    public MicroserviceModbusController(final DeviceModelMB110_1TD deviceModel) {
        this.deviceModel = deviceModel;
    }

    @RequestMapping(value = "/read-all",method = RequestMethod.GET)
    public DeviceModelMB110_1TD readRegisterAll(){
        return deviceModel;
    }
}
