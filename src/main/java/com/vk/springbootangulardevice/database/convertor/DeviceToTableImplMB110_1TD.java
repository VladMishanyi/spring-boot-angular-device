package com.vk.springbootangulardevice.database.convertor;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.lib.FloatCut;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Created by User on 2018-02-28.
 */
@Component
@ComponentScan(basePackages = {"com.vk.springbootangulardevice.modbus", "com.vk.springbootangulardevice.database"})
public class DeviceToTableImplMB110_1TD
        extends DeviceToTableImpl<DeviceModelMB110_1TD,
        DeviceModelMB110_1TD,
        TableModelMB110_1TD> implements DeviceToTableMB110_1TD{

    @Override
    public TableModelMB110_1TD convert(final DeviceModelMB110_1TD deviceModel){
        TableModelMB110_1TD tableModel = null;
        if (Objects.nonNull(deviceModel)){
            tableModel = new TableModelMB110_1TD();
            tableModel.setDate(LocalDateTime.now());
            tableModel.setHoldingRegister0(FloatCut.floatTwoDigs(deviceModel.getHoldingRegister0()));
        }
        return tableModel;
    }
}
