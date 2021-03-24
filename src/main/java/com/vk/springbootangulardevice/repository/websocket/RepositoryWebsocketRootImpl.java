package com.vk.springbootangulardevice.repository.websocket;


import com.vk.springbootangulardevice.modbus.device.DeviceModel;
import org.springframework.messaging.core.MessageSendingOperations;

public class RepositoryWebsocketRootImpl<D extends DeviceModel> implements RepositoryWebsocketRoot<D> {

    private MessageSendingOperations<String> messageSendingOperationsRoot;

    private String consumerRoot;

    public RepositoryWebsocketRootImpl(final MessageSendingOperations<String> messageSendingOperationsRoot,
                                       final String consumerRoot){
        this.messageSendingOperationsRoot = messageSendingOperationsRoot;
        this.consumerRoot = consumerRoot;
    }

    @Override
    public void messageSendDevice(D deviceModelDevice) {
        messageSendingOperationsRoot.convertAndSend(consumerRoot, deviceModelDevice);
    }
}
