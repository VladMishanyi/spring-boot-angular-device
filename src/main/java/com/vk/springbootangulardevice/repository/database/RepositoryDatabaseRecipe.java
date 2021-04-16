package com.vk.springbootangulardevice.repository.database;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import org.springframework.data.jpa.repository.Query;

public interface RepositoryDatabaseRecipe extends RepositoryDatabaseRoot<TableModelRecipe>{

    @Query(value = "SELECT * FROM recipe ORDER BY date DESC LIMIT 1",nativeQuery = true)
    TableModelRecipe findLastValueByDate ();
}
