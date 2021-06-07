package com.vk.springbootangulardevice.repository.modbus;

import com.serotonin.modbus4j.BatchRead;
import com.vk.springbootangulardevice.modbus.ModbusFloat;
import com.vk.springbootangulardevice.modbus.ModbusInteger;
import com.vk.springbootangulardevice.modbus.ModbusShort;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.entity.ModbusMasterSerialModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ArrayBlockingQueue;

@Repository
@ComponentScan(basePackages = {"com.vk.springbootangulardevice","com.vk.springbootangulardevice.modbus"})
@PropertySource(value = "classpath:application.properties")
public class RepositoryModbusMB110_1TDImpl implements RepositoryModbusMB110_1TD{

    private final ModbusMasterSerialModel modbusMasterSerialFirst;
    private final DeviceModelMB110_1TD deviceModelMB110_1TD;
    private final BatchRead<Integer> batchRead;
    private final ModbusFloat modbusFloat;
    private final ModbusInteger modbusInteger;
    private final ModbusShort modbusShort;
    private final int queueSize = 300;
    private Queue<Float> queue = new ArrayBlockingQueue<Float>(queueSize);

    @Value("${chart.smoothing}")
    private int borderSize;

    @Autowired
    public RepositoryModbusMB110_1TDImpl(final ModbusMasterSerialModel modbusMasterSerialFirst,
                                         final DeviceModelMB110_1TD deviceModelMB110_1TD,
                                         final BatchRead<Integer> batchRead,
                                         final ModbusFloat modbusFloat,
                                         final ModbusShort modbusShort,
                                         final ModbusInteger modbusInteger) {
        this.modbusMasterSerialFirst = modbusMasterSerialFirst;
        this.deviceModelMB110_1TD = deviceModelMB110_1TD;
        this.batchRead = batchRead;
        this.modbusFloat = modbusFloat;
        this.modbusShort = modbusShort;
        this.modbusInteger = modbusInteger;
    }

    @Override
    public DeviceModelMB110_1TD readDataFromRegisterAll(final boolean useBorders,
                                                     final short borderMin,
                                                     final short borderMax,
                                                     final float digsFloat,
                                                     final boolean enableBatch) {
        if (Objects.nonNull(modbusFloat) && Objects.nonNull(modbusInteger)){

            modbusFloat.setUseBorders(useBorders, borderMax, borderMin);
            final List<Float> listFloat =  modbusFloat.readDataFromModBusDigs(
                    digsFloat,
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    batchRead,
                    enableBatch,
                    deviceModelMB110_1TD.getModbusLocator0h(),
                    deviceModelMB110_1TD.getModbusLocator5h(),
                    deviceModelMB110_1TD.getModbusLocator6h(),
                    deviceModelMB110_1TD.getModbusLocator7h()
                    );
            deviceModelMB110_1TD.setHoldingRegister0(doingSomeMathForProperShovingCharts(listFloat.get(0)));
            deviceModelMB110_1TD.setHoldingRegister5(listFloat.get(1));
            deviceModelMB110_1TD.setHoldingRegister6(listFloat.get(2));
            deviceModelMB110_1TD.setHoldingRegister7(listFloat.get(3));

            modbusInteger.setUseBorders(useBorders, borderMax, borderMin);
            final List<Integer> list =  modbusInteger.readDataFromModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    batchRead,
                    enableBatch,
                    deviceModelMB110_1TD.getModbusLocator3h(),
                    deviceModelMB110_1TD.getModbusLocator4h());
            deviceModelMB110_1TD.setHoldingRegister3(list.get(0));
            deviceModelMB110_1TD.setHoldingRegister4(list.get(1));
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
            deviceModelMB110_1TD.setHoldingRegister0(doingSomeMathForProperShovingCharts(listFloat.get(0)));
        }
        return deviceModelMB110_1TD;
    }
    @Override
    public DeviceModelMB110_1TD readDataFromRegister3(final boolean useBorders,
                                                      final short borderMin,
                                                      final short borderMax,
                                                      final boolean enableBatch) {
        if (Objects.nonNull(modbusInteger)){
            modbusInteger.setUseBorders(useBorders, borderMax, borderMin);
            final List<Integer> list =  modbusInteger.readDataFromModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    batchRead,
                    enableBatch,
                    deviceModelMB110_1TD.getModbusLocator3h());
            deviceModelMB110_1TD.setHoldingRegister3(list.get(0));
        }
        return deviceModelMB110_1TD;
    }
    @Override
    public DeviceModelMB110_1TD readDataFromRegister4(final boolean useBorders,
                                                      final short borderMin,
                                                      final short borderMax,
                                                      final boolean enableBatch) {
        if (Objects.nonNull(modbusInteger)){
            modbusInteger.setUseBorders(useBorders, borderMax, borderMin);
            final List<Integer> list =  modbusInteger.readDataFromModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    batchRead,
                    enableBatch,
                    deviceModelMB110_1TD.getModbusLocator4h());
            deviceModelMB110_1TD.setHoldingRegister4(list.get(0));
        }
        return deviceModelMB110_1TD;
    }
    @Override
    public DeviceModelMB110_1TD readDataFromRegister5(final boolean useBorders,
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
                    deviceModelMB110_1TD.getModbusLocator5h());
            deviceModelMB110_1TD.setHoldingRegister5(listFloat.get(0));
        }
        return deviceModelMB110_1TD;
    }
    @Override
    public DeviceModelMB110_1TD readDataFromRegister6(final boolean useBorders,
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
                    deviceModelMB110_1TD.getModbusLocator6h());
            deviceModelMB110_1TD.setHoldingRegister6(listFloat.get(0));
        }
        return deviceModelMB110_1TD;
    }
    @Override
    public DeviceModelMB110_1TD readDataFromRegister7(final boolean useBorders,
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
                    deviceModelMB110_1TD.getModbusLocator7h());
            deviceModelMB110_1TD.setHoldingRegister7(listFloat.get(0));
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
                    deviceModelMB110_1TD.getModbusLocator1h());
            deviceModelMB110_1TD.setHoldingRegister1(value);
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister2(final short value) {
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

    @Override
    public DeviceModelMB110_1TD writeDataToRegister3(final short value) {
        if (Objects.nonNull(modbusShort)){
            modbusShort.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator3h());
            deviceModelMB110_1TD.setHoldingRegister3(value);
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister4(final short value) {
        if (Objects.nonNull(modbusShort)){
            modbusShort.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator4h());
            deviceModelMB110_1TD.setHoldingRegister4(value);
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister5(final float value) {
        if (Objects.nonNull(modbusFloat)){
            modbusFloat.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator5h());
            deviceModelMB110_1TD.setHoldingRegister5(value);
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister6(final float value) {
        if (Objects.nonNull(modbusFloat)){
            modbusFloat.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator6h());
            deviceModelMB110_1TD.setHoldingRegister6(value);
        }
        return deviceModelMB110_1TD;
    }

    @Override
    public DeviceModelMB110_1TD writeDataToRegister7(final float value) {
        if (Objects.nonNull(modbusFloat)){
            modbusFloat.writeDataToModBus(
                    modbusMasterSerialFirst,
                    deviceModelMB110_1TD.getDeviceAddress(),
                    value,
                    deviceModelMB110_1TD.getModbusLocator7h());
            deviceModelMB110_1TD.setHoldingRegister7(value);
        }
        return deviceModelMB110_1TD;
    }

    private float doingSomeMathForProperShovingCharts(float val) {
        return doingMaxSmoothing(doingAbs(val), borderSize);
    }

    private float doingAbs(float val) {
        return Math.abs(val);
    }

    private float doingAverageSmoothing(float val, final int border) {
        int s = queue.size();
        queue.offer(val);
        float inner = (float) queue.stream().mapToDouble(x -> x).average().getAsDouble();
        if (s >= border){
            queue.poll();
        }
        return inner;
    }

    private float doingMaxSmoothing(float val, final int border) {
        int s = queue.size();
        queue.offer(val);
        float inner = queue.stream().max(Float::compare).get();
        if (s >= border){
            queue.poll();
            System.out.println("try to send info from max smoothing : "+"size :"+s+" inner :"+inner+" val :"+val);
        }
        System.out.println("try to send info from max smoothing : "+"size :"+s+" border :"+border+" val :"+val+" queueSize :"+queueSize);
        return inner;
    }
}
