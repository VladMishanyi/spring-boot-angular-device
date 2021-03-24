package com.vk.springbootangulardevice.repository.websocket;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Repository;

@Repository
@ComponentScan(basePackages = {"com.vk.springbootangulardevice"})
public class RepositoryWebsocketMB110_1TDImpl implements RepositoryWebsocketMB110_1TD{

    private MessageSendingOperations<String> messageSendingOperationsRoot;

    private final String consumerRoot = "/topic/table-model-mv110-1td";

    @Autowired
    public RepositoryWebsocketMB110_1TDImpl(final MessageSendingOperations<String> messageSendingOperationsRoot){
        this.messageSendingOperationsRoot = messageSendingOperationsRoot;
    }

    @Override
    public void messageSendDevice(TableModelMB110_1TD deviceModelDevice) {
        messageSendingOperationsRoot.convertAndSend(consumerRoot, deviceModelDevice);
    }
}
