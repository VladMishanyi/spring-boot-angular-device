package com.vk.springbootangulardevice.modbus.test_connection.modbus_serial;

import com.serotonin.modbus4j.BatchRead;
import com.vk.springbootangulardevice.modbus.device.DeviceModelTRM251;
import com.vk.springbootangulardevice.modbus.*;
import com.vk.springbootangulardevice.modbus.en.DigsFloat;
import com.vk.springbootangulardevice.modbus.entity.ModbusMasterSerialModel;

import java.util.List;

/**
 * Created by User on 2017-05-15.
 */

public class MasterSerialRTU {

    public static void main(String[] args) throws Exception {
        long startTime = 0;
        final ModbusMasterSerialModel modbusMasterSerialModel3 = new ModbusMasterSerialModel("COM26", 9600, 8, 1, 0, 200, 1);


        final ModbusInteger modbusInteger = new ModbusIntegerImpl();
        modbusInteger.setUseBorders(false);
        final ModbusFloat modbusFloat = new ModbusFloatImpl();
        modbusFloat.setUseBorders(false);

        final DeviceModelTRM251 deviceModelTRM138 = new DeviceModelTRM251();

        int i = 0;
        while (true){
            System.out.println("----"+i);
            startTime = System.currentTimeMillis();
            BatchRead<Integer> batchRead = new BatchRead<>();
            List<Float> valFloat = modbusFloat.readDataFromModBusDigs(
                    DigsFloat.ONE_DIG,
                    modbusMasterSerialModel3,
                    deviceModelTRM138.getDeviceAddress(),
                    batchRead,
                    false,
                    deviceModelTRM138.getModbusLocator0i(),
                    deviceModelTRM138.getModbusLocator1i());

            System.out.println("Time elapsed: " + (System.currentTimeMillis() - startTime) + "ms");
            valFloat.forEach(System.out::println);
            System.out.println("----------------------------------------------------------------------------------------");
            Thread.sleep(1000);
            i++;
        }
    }
}
