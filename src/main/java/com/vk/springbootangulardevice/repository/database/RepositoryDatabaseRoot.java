package com.vk.springbootangulardevice.repository.database;

import com.vk.springbootangulardevice.database.table.TableModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by KIP-PC99 on 11.06.2018.
 */
@NoRepositoryBean
public interface RepositoryDatabaseRoot<E extends TableModel> extends JpaRepository<E ,Long> {

    @Query(value = "SELECT (data_length+index_length) tablesize FROM information_schema.tables WHERE table_schema='ReometrBase'", nativeQuery = true)
    List<BigInteger> readBaseSize();

    List<E> findByDateBetween (LocalDateTime start, LocalDateTime end);
}
