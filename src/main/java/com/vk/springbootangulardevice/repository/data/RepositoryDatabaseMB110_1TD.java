package com.vk.springbootangulardevice.repository.data;


import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import org.springframework.data.jpa.repository.Query;

public interface RepositoryDatabaseMB110_1TD extends RepositoryDatabaseRoot<TableModelMB110_1TD> {

    @Query(value = "SELECT * FROM mv110_1td ORDER BY date DESC LIMIT 1",nativeQuery = true)
    TableModelMB110_1TD findLastValueByDate ();
}
