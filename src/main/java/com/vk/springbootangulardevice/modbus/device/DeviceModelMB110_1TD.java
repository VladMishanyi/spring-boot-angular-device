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
public class DeviceModelMB110_1TD implements DeviceModel {

    @JsonIgnore
    private transient final int deviceAddress = 16;//16-24 reserved for this device
    @JsonIgnore
    private transient final float hysteresisFloat = 1.0F;
    @JsonIgnore
    private transient final int hysteresisInt = 1;

    private float holdingRegister0 = 0F;
    @JsonIgnore
    private transient float oldHoldingRegister0 = 0F;
    /**
     * This modbusLocator0h uses for read real value of stretching
     */
    @JsonIgnore
    private transient final ModbusLocator modbusLocator0h = new ModbusLocator(deviceAddress, RegisterRange.HOLDING_REGISTER, 70, DataType.FOUR_BYTE_FLOAT);

    private int holdingRegister1 = 0;
    @JsonIgnore
    private transient int oldHoldingRegister1 = 0;
    /**
     * This modbusLocator1h uses for write a current not correct value on sensor as zero point. Pay attention it will apply just after INIT command.
     * Only 0 value is allowed
     */
    @JsonIgnore
    private transient final ModbusLocator modbusLocator1h = new ModbusLocator(deviceAddress, RegisterRange.HOLDING_REGISTER, 49, DataType.TWO_BYTE_INT_UNSIGNED);

    private int holdingRegister2 = 0;
    @JsonIgnore
    private transient int oldHoldingRegister2 = 0;
    @JsonIgnore
    /**
     * This modbusLocator2h uses for commit all changes. It is INIT command.
     * Only 0 value is allowed
     */
    private transient final ModbusLocator modbusLocator2h = new ModbusLocator(deviceAddress, RegisterRange.HOLDING_REGISTER, 57, DataType.TWO_BYTE_INT_UNSIGNED);

    private int holdingRegister3 = 0;
    @JsonIgnore
    private transient int oldHoldingRegister3 = 0;
    @JsonIgnore
    /**
     * This modbusLocator3h uses to apply weight of item to zero point measure.
     * Only 0 or 1 value is allowed
     */
    private transient final ModbusLocator modbusLocator3h = new ModbusLocator(deviceAddress, RegisterRange.HOLDING_REGISTER, 13, DataType.TWO_BYTE_INT_UNSIGNED);


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

    public int getHoldingRegister1() {
        return holdingRegister1;
    }

    public void setHoldingRegister1(int holdingRegister1) {
        this.holdingRegister1 = holdingRegister1;
    }

    public int getOldHoldingRegister1() {
        return oldHoldingRegister1;
    }

    public void setOldHoldingRegister1(int oldHoldingRegister1) {
        this.oldHoldingRegister1 = oldHoldingRegister1;
    }

    public ModbusLocator getModbusLocator1h() {
        return modbusLocator1h;
    }

    public int getHoldingRegister2() {
        return holdingRegister2;
    }

    public void setHoldingRegister2(int holdingRegister2) {
        this.holdingRegister2 = holdingRegister2;
    }

    public int getOldHoldingRegister2() {
        return oldHoldingRegister2;
    }

    public void setOldHoldingRegister2(int oldHoldingRegister2) {
        this.oldHoldingRegister2 = oldHoldingRegister2;
    }

    public ModbusLocator getModbusLocator2h() {
        return modbusLocator2h;
    }

    public int getHoldingRegister3() {
        return holdingRegister3;
    }

    public void setHoldingRegister3(int holdingRegister3) {
        this.holdingRegister3 = holdingRegister3;
    }

    public int getOldHoldingRegister3() {
        return oldHoldingRegister3;
    }

    public void setOldHoldingRegister3(int oldHoldingRegister3) {
        this.oldHoldingRegister3 = oldHoldingRegister3;
    }

    public ModbusLocator getModbusLocator3h() {
        return modbusLocator3h;
    }

    @Override
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
