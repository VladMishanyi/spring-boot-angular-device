package com.vk.springbootangulardevice.service;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import com.vk.springbootangulardevice.json.JsonBodyListForTableModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.device.DeviceModelMB110_1TD;
import com.vk.springbootangulardevice.modbus.en.DigsFloat;
import com.vk.springbootangulardevice.model.JsonBoolean;
import com.vk.springbootangulardevice.model.JsonString;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseMB110_1TD;
import com.vk.springbootangulardevice.repository.database.RepositoryDatabaseRecipe;
import com.vk.springbootangulardevice.repository.modbus.RepositoryModbusMB110_1TD;
import com.vk.springbootangulardevice.repository.raspberry.RepositoryRaspberry;
import com.vk.springbootangulardevice.repository.websocket.RepositoryWebsocketMB110_1TD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@ComponentScan(basePackages = {"com.vk.servicesiliconezone.repository.database","com.vk.servicesiliconezone.repository.modbus"})
public class ServiceRecipeImpl implements ServiceRecipe {
    private final RepositoryDatabaseRecipe repositoryDatabase;

    @Autowired
    public ServiceRecipeImpl(final RepositoryDatabaseRecipe repositoryDatabase) {
        this.repositoryDatabase = repositoryDatabase;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TableModelRecipe> databaseFindByDateBetween (final LocalDateTime start, final LocalDateTime end){
        return repositoryDatabase.findByDateBetween(start, end);
    }
    @Transactional(readOnly = true)
    @Override
    public TableModelRecipe databaseFindLastValueByDate (){
        return repositoryDatabase.findLastValueByDate();
    }
    @Transactional
    @Override
    public void databaseAddTableDevice(final TableModelRecipe tableModel){
        repositoryDatabase.saveAndFlush(tableModel);
    }
    @Transactional
    @Override
    public void databaseAddAllTableDevice(final List<TableModelRecipe> tableModelList){
        repositoryDatabase.saveAll(tableModelList);
    }
}
