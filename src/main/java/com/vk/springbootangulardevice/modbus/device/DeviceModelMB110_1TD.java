package com.vk.springbootangulardevice.modbus.device;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.serotonin.modbus4j.ModbusLocator;
import com.serotonin.modbus4j.code.DataType;
import com.serotonin.modbus4j.code.RegisterRange;
import com.vk.springbootangulardevice.modbus.lib.HysComparator;
import org.springframework.stereotype.Component;

/**
 * Created by KIP-PC99 on 20.09.2018.
 */
@Component
public class DeviceModelMB110_1TD {

    @JsonIgnore
    private transient final int deviceAddress = 16;//16-24 reserved for this device
    @JsonIgnore
    private transient final float hysteresisFloat = 1.0F;
    @JsonIgnore
    private transient final int hysteresisInt = 1;

    private float holdingRegister0 = 0F;
    @JsonIgnore
    private transient float oldHoldingRegister0 = 0F;
    @JsonIgnore
    private transient final ModbusLocator modbusLocator0h = new ModbusLocator(deviceAddress, RegisterRange.HOLDING_REGISTER, 70, DataType.FOUR_BYTE_FLOAT);


    public DeviceModelMB110_1TD(){}

    public int getDeviceAddress() {
        return deviceAddress;
    }

    public float getHysteresisFloat() {
        return hysteresisFloat;
    }

    public int getHysteresisInt() {
        return hysteresisInt;
    }

    public float getHoldingRegister0() {
        return holdingRegister0;
    }

    public void setHoldingRegister0(float holdingRegister0) {
        this.holdingRegister0 = holdingRegister0;
    }

    public float getOldHoldingRegister0() {
        return oldHoldingRegister0;
    }

    public void setOldHoldingRegister0(float oldHoldingRegister0) {
        this.oldHoldingRegister0 = oldHoldingRegister0;
    }

    public ModbusLocator getModbusLocator0h() {
        return modbusLocator0h;
    }

    public boolean hysteresis(){
        boolean inner = HysComparator.compare(oldHoldingRegister0,
                holdingRegister0,
                hysteresisFloat);
        if (inner){
            oldHoldingRegister0 = holdingRegister0;
        }
        return inner;
    }
}
