package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonString;

import java.time.LocalDateTime;
import java.util.List;

public interface ServiceRecipe {
    List<TableModelRecipe> databaseFindByDateBetween (final LocalDateTime start, final LocalDateTime end);
    TableModelRecipe databaseFindLastValueByDate ();
    void databaseAddTableDevice(final TableModelRecipe tableModel);
    void databaseAddAllTableDevice(final List<TableModelRecipe> tableModelList);
}
