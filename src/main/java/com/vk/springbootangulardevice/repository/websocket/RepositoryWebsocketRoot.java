package com.vk.springbootangulardevice.repository.websocket;


import com.vk.springbootangulardevice.modbus.device.DeviceModel;

public interface RepositoryWebsocketRoot<D extends DeviceModel> {

    void messageSendDevice(D deviceModelDevice);
}
