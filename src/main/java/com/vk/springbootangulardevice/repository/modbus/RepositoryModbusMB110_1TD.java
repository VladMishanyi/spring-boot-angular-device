package com.vk.springbootangulardevice.repository.modbus;

import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;

public interface RepositoryModbusMB110_1TD extends RepositoryModbusRoot<DeviceModelMB110_1TD>{

    DeviceModelMB110_1TD readDataFromRegister0(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);
//    DeviceModelMB110_1TD readDataFromRegister1(//only write provided for this register
//            final boolean useBorders,
//            final short borderMin,
//            final short borderMax,
//            final float digsFloat,
//            final boolean enableBatch);
//    DeviceModelMB110_1TD readDataFromRegister2(//only write provided for this register
//            final boolean useBorders,
//            final short borderMin,
//            final short borderMax,
//            final float digsFloat,
//            final boolean enableBatch);
    DeviceModelMB110_1TD readDataFromRegister3(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final boolean enableBatch);
    DeviceModelMB110_1TD readDataFromRegister4(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final boolean enableBatch);
    DeviceModelMB110_1TD readDataFromRegister5(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);
    DeviceModelMB110_1TD readDataFromRegister6(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);
    DeviceModelMB110_1TD readDataFromRegister7(
            final boolean useBorders,
            final short borderMin,
            final short borderMax,
            final float digsFloat,
            final boolean enableBatch);

//    DeviceModelMB110_1TD writeDataToRegister0(final short value);//only read provided for this register
    DeviceModelMB110_1TD writeDataToRegister1(final short value);
    DeviceModelMB110_1TD writeDataToRegister2(final short value);
    DeviceModelMB110_1TD writeDataToRegister3(final short value);
    DeviceModelMB110_1TD writeDataToRegister4(final short value);
    DeviceModelMB110_1TD writeDataToRegister5(final float value);
    DeviceModelMB110_1TD writeDataToRegister6(final float value);
    DeviceModelMB110_1TD writeDataToRegister7(final float value);
}
