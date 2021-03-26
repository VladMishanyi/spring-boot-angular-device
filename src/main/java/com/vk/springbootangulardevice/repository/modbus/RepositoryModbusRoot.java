package com.vk.springbootangulardevice.repository.modbus;

import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;

public interface RepositoryModbusRoot<D extends DeviceModel> {
    D readDataFromRegisterAll(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);
}
