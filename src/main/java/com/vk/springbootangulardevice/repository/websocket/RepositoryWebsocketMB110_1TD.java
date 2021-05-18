package com.vk.springbootangulardevice.repository.websocket;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonString;

public interface RepositoryWebsocketMB110_1TD extends RepositoryWebsocketRoot<DeviceModelMB110_1TD>{
    void messageTimerStatus(JsonBoolean status);
    void messageContactStatus(JsonBoolean status);
    void messageTextStatus(JsonString status);
}
