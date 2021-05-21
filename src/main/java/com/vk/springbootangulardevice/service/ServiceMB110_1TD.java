package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonFloat;
import com.vk.springbootangulardevice.model.JsonString;

import java.time.LocalDateTime;
import java.util.List;

public interface ServiceMB110_1TD extends ServiceRoot<TableModelMB110_1TD, JsonBodyListForTableModelMB110_1TD, DeviceModelMB110_1TD>{

    DeviceModelMB110_1TD modbusReadDataFromRegister0();
//    DeviceModelMB110_1TD modbusReadDataFromRegister1();//only write provided for this register
//    DeviceModelMB110_1TD modbusReadDataFromRegister2();//only write provided for this register
    DeviceModelMB110_1TD modbusReadDataFromRegister3();
    DeviceModelMB110_1TD modbusReadDataFromRegister4();
    DeviceModelMB110_1TD modbusReadDataFromRegister5();
    DeviceModelMB110_1TD modbusReadDataFromRegister6();
    DeviceModelMB110_1TD modbusReadDataFromRegister7();
//    DeviceModelMB110_1TD modbusWriteDataToRegister0(final short value);//only read provided for this register
    DeviceModelMB110_1TD modbusWriteDataToRegister1(final short value);
    DeviceModelMB110_1TD modbusWriteDataToRegister2(final short value);
    DeviceModelMB110_1TD modbusWriteDataToRegister3(final short value);
    DeviceModelMB110_1TD modbusWriteDataToRegister4(final short value);
    DeviceModelMB110_1TD modbusWriteDataToRegister5(final float value);
    DeviceModelMB110_1TD modbusWriteDataToRegister6(final float value);
    DeviceModelMB110_1TD modbusWriteDataToRegister7(final float value);

    void messageTimerStatus(JsonBoolean status);
    void messageContactStatus(JsonBoolean status);
    void messageTextStatus(JsonString status);
    void messageRealMeasuringValueFromSensor(DeviceModelMB110_1TD status);
}
