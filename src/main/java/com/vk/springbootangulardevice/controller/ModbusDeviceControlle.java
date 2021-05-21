package com.vk.springbootangulardevice.controller;

import com.vk.springbootangulardevice.chain.ChainModbus;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.entity.ModbusBodyQuery;
import com.vk.springbootangulardevice.model.JsonFloat;
import com.vk.springbootangulardevice.model.JsonShort;
import com.vk.springbootangulardevice.service.ServiceMB110_1TD;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ModbusDeviceControlle {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    private final ServiceMB110_1TD serviceMB110_1TD;
    private final DeviceModelMB110_1TD deviceModelMB110_1TD;

    @Autowired
    public ModbusDeviceControlle(ServiceMB110_1TD serviceMB110_1TD, DeviceModelMB110_1TD deviceModelMB110_1TD) {
        this.serviceMB110_1TD = serviceMB110_1TD;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
    }

    @MessageMapping(value="/write-enable-disable-weight-of-item")
    public void writeEnableDisableWeightOfItem(JsonShort value){
        short val = value.getContent();
        if ( (val >= 0) && (val <= 1) ){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(3, val));
        } else{
            LOGGER.error("/write-enable-disable-weight-of-item  - out of bound length :"+val);
            System.out.println("/write-enable-disable-weight-of-item - out of bound length :"+val);
        }
    }

    @MessageMapping(value="/write-sensitivity-sensor")
    public void writeSensitivitySensor(JsonShort value){
        short val = value.getContent();
        if ( (val >= 0) && (val <= 6) ){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(4, val));
        } else{
            LOGGER.error("/write-sensitivity-sensor  - out of bound length :"+val);
            System.out.println("/write-sensitivity-sensor - out of bound length :"+val);
        }
    }

    @MessageMapping(value="/write-min-border-value-for-sensor")
    public void writeMinBorderValueForSensor(JsonFloat value){
        float val = value.getContent();
        if ( (val >= -65000.0F) && (val <= 65000.0F) ){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(5, val));
        } else{
            LOGGER.error("/write-min-border-value-for-sensor  - out of bound length :"+val);
            System.out.println("/write-min-border-value-for-sensor - out of bound length :"+val);
        }
    }

    @MessageMapping(value="/write-max-border-value-for-sensor")
    public void writeMaxBorderValueForSensor(JsonFloat value){
        float val = value.getContent();
        if ( (val >= -65000.0F) && (val <= 65000.0F) ){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(6, val));
        } else{
            LOGGER.error("/write-max-border-value-for-sensor  - out of bound length :"+val);
            System.out.println("/write-max-border-value-for-sensor - out of bound length :"+val);
        }
    }

    @MessageMapping(value="/write-set-weight-item")
    public void writeSetWeightItem(JsonFloat value){
        float val = value.getContent();
        if ( (val >= -65000.0F) && (val <= 65000.0F) ){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(7, val));
        } else{
            LOGGER.error("/write-max-border-value-for-sensor  - out of bound length :"+val);
            System.out.println("/write-max-border-value-for-sensor - out of bound length :"+val);
        }
    }

    @MessageMapping(value="/write-weight-of-item-as-a-zero")
    public void writeWeightOfItemAsAZero(JsonShort value){
        short val = value.getContent();
        if (val == 0){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(1, val));
        } else{
            LOGGER.error("/write-weight-of-item-as-a-zero  - out of bound length :"+val);
            System.out.println("/write-weight-of-item-as-a-zero - out of bound length :"+val);
        }
    }

    @MessageMapping(value="/write-save-all-changes")
    public void writeSaveAllChanges(JsonShort value){
        short val = value.getContent();
        if (val == 0){
            ChainModbus.modbusBodyQueryQueue.add(new ModbusBodyQuery(2, val));
        } else{
            LOGGER.error("/write-save-all-changes  - out of bound length :"+val);
            System.out.println("/write-save-all-changes - out of bound length :"+val);
        }
    }
}
