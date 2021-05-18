package com.vk.springbootangulardevice.repository.websocket;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;

public interface RepositoryWebsocketMB110_1TD extends RepositoryWebsocketRoot<DeviceModelMB110_1TD>{
    void messageTimerStatus(boolean status);
    void messageContactStatus(boolean status);
    void messageTextStatus(String status);
}
