package com.vk.springbootangulardevice.repository.websocket;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Repository;

@Repository
@ComponentScan(basePackages = {"com.vk.springbootangulardevice"})
public class RepositoryWebsocketMB110_1TDImpl extends RepositoryWebsocketRootImpl<DeviceModelMB110_1TD> implements RepositoryWebsocketMB110_1TD{

    @Autowired
    public RepositoryWebsocketMB110_1TDImpl(final MessageSendingOperations<String> messageSendingOperationsRoot){
        super(messageSendingOperationsRoot, "/topic/table-model-mv110-1td");
    }
}
