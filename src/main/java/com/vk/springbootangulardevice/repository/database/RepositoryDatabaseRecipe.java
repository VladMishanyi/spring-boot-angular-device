package com.vk.springbootangulardevice.repository.database;

import com.vk.springbootangulardevice.database.table.TableModelMB110_1TD;
import com.vk.springbootangulardevice.database.table.TableModelRecipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RepositoryDatabaseRecipe extends RepositoryDatabaseRoot<TableModelRecipe>{

    @Query(value = "SELECT * FROM recipe ORDER BY date DESC LIMIT 1",nativeQuery = true)
    TableModelRecipe findLastValueByDate ();

//    @Query(value = "SELECT r.* FROM recipe as r LEFT JOIN mv110_1td as d on r.id = d.id_recipe WHERE r.name LIKE '%:pattern%' ORDER BY r.date DESC LIMIT 5", nativeQuery = true)
//    @Query(value = "SELECT r FROM TableModelRecipe r LEFT JOIN FETCH r.tableModelMB110_1TDList WHERE r.name LIKE %:pattern% ORDER BY r.date DESC", nativeQuery = false)
    @Query(value = "SELECT r FROM TableModelRecipe r WHERE r.name LIKE %:pattern% ORDER BY r.date DESC", nativeQuery = false)
    List<TableModelRecipe> findAllByName(@Param(value = "pattern") String pattern);
}
