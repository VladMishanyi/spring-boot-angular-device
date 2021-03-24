package com.vk.springbootangulardevice.repository.modbus;

import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;

public interface RepositoryModbusMB110_1TD {
    DeviceModelMB110_1TD readDataFromRegisterAll(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);

    DeviceModelMB110_1TD readDataFromRegister0(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);

    DeviceModelMB110_1TD writeDataToRegister0(final short value);
    DeviceModelMB110_1TD writeDataToRegister1(final short value);
}
