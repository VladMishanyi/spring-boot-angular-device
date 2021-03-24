package com.vk.springbootangulardevice.repository.modbus;

import com.serotonin.modbus4j.BatchRead;
import com.vk.springbootangulardevice.modbus.ModbusFloat;
import com.vk.springbootangulardevice.modbus.ModbusShort;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.entity.ModbusMasterSerialModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
@ComponentScan(basePackages = {"com.vk.springbootangulardevice","com.vk.springbootangulardevice.modbus"})
public class RepositoryModbusMB110_1TDImpl implements RepositoryModbusMB110_1TD{

    private final ModbusMasterSerialModel modbusMasterSerialFirst;

    private final DeviceModelMB110_1TD deviceModelMB110_1TD;

    private final BatchRead<Integer> batchRead;

    private final ModbusFloat modbusFloat;

    private final ModbusShort modbusShort;

    @Autowired
    public RepositoryModbusMB110_1TDImpl(final ModbusMasterSerialModel modbusMasterSerialFirst,
                                         final DeviceModelMB110_1TD deviceModelMB110_1TD,
                                         final BatchRead<Integer> batchRead,
                                         final ModbusFloat modbusFloat,
                                         final ModbusShort modbusShort) {
        this.modbusMasterSerialFirst = modbusMasterSerialFirst;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.batchRead = batchRead;
        this.modbusFloat = modbusFloat;
        this.modbusShort = modbusShort;
    }

    @Override
    public DeviceModelMB110_1TD readDataFromRegisterAll(final boolean useBorders,
                                                     final short borderMin,
                                                     final short borderMax,
                                                     final float digsFloat,
                                                     final boolean enableBatch) {
        if (Objects.nonNull(modbusFloat)){
            modbusFloat.setUseBorders(useBorders, borderMax, borderMin);
            final List<Float> listFloat =  modbusFloat.readDataFromModBusDigs(
                    digsFloat,
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    batchRead,
                    enableBatch,
                    deviceModelMB110_1TD.getModbusLocator0h()
                    );
            deviceModelMB110_1TD.setHoldingRegister0(listFloat.get(0));
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD readDataFromRegister0(final boolean useBorders,
                                                   final short borderMin,
                                                   final short borderMax,
                                                   final float digsFloat,
                                                   final boolean enableBatch) {
        if (Objects.nonNull(modbusFloat)){
            modbusFloat.setUseBorders(useBorders, borderMax, borderMin);
            final List<Float> listFloat =  modbusFloat.readDataFromModBusDigs(
                    digsFloat,
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    batchRead,
                    enableBatch,
                    deviceModelMB110_1TD.getModbusLocator0h());
            deviceModelMB110_1TD.setHoldingRegister0(listFloat.get(0));
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister0(final short value) {
        if (Objects.nonNull(modbusShort)){
            modbusShort.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator1h());
            deviceModelMB110_1TD.setHoldingRegister1(value);
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister1(final short value) {
        if (Objects.nonNull(modbusShort)){
            modbusShort.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator2h());
            deviceModelMB110_1TD.setHoldingRegister2(value);
        }
        return deviceModelMB110_1TD;
    }
}
