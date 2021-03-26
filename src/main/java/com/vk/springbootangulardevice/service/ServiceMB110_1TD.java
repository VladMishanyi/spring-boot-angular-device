package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;

import java.time.LocalDateTime;
import java.util.List;

public interface ServiceMB110_1TD extends ServiceRoot<TableModelMB110_1TD, JsonBodyListForTableModelMB110_1TD, DeviceModelMB110_1TD>{

    DeviceModelMB110_1TD modbusReadDataFromRegister0();
    DeviceModelMB110_1TD modbusReadDataFromRegister1();
    DeviceModelMB110_1TD modbusWriteDataToRegister0(final short value);
    DeviceModelMB110_1TD modbusWriteDataToRegister1(final short value);
}
