package com.vk.springbootangulardevice.database.table;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "recipe")
public class TableModelRecipe extends TableModel{

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "time", nullable = false)
    private int time;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "tableModelRecipe", orphanRemoval = true)
    private List<TableModelMB110_1TD> tableModelMB110_1TDList = new ArrayList<>();

    public TableModelRecipe(){}

    public TableModelRecipe(String name, int time) {
        this.name = name;
        this.time = time;
    }

    public TableModelRecipe(long id, LocalDateTime date, String name, int time) {
        super(id, date);
        this.name = name;
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public void addMB110_1DT(TableModelMB110_1TD tableModelMB110_1TD) {
        tableModelMB110_1TDList.add(tableModelMB110_1TD);
        tableModelMB110_1TD.setRecipe(this);
    }

    public void deleteMB110_1DT(TableModelMB110_1TD tableModelMB110_1TD) {
        tableModelMB110_1TDList.remove(tableModelMB110_1TD);
        tableModelMB110_1TD.setRecipe(null);
    }

    @Override
    public boolean equals(Object object) {
        boolean result = super.equals(object);
        if (result){
            TableModelRecipe tableModelRecipe = (TableModelRecipe) object;
            result = (time == tableModelRecipe.time) &&
                    (name.equals(tableModelRecipe.name)) &&
                    (tableModelMB110_1TDList.equals(tableModelRecipe.tableModelMB110_1TDList));
        }
        return result;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, time, tableModelMB110_1TDList);
    }

    @Override
    public String toString() {
        return "TableModelRecipe{" +
                super.toString()+
                "name='" + name + '\'' +
                ", time=" + time +
                ", tableModelMB110_1TDList=" + tableModelMB110_1TDList +
                '}';
    }

    @Override
    public TableModelRecipe clone() {
        return (TableModelRecipe) super.clone();
    }
}
