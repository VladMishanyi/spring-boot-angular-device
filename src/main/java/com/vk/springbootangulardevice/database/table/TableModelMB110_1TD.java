package com.vk.springbootangulardevice.database.table;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "mv110_1td")
public class TableModelMB110_1TD extends TableModel{

    @Column(name = "holdingRegister0", columnDefinition = "float default 0")
    private Float holdingRegister0 = 0F;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_recipe")
    private TableModelRecipe tableModelRecipe;

    public TableModelMB110_1TD() {
    }

    public Float getHoldingRegister0() {
        return holdingRegister0;
    }

    public void setHoldingRegister0(Float holdingRegister0) {
        this.holdingRegister0 = holdingRegister0;
    }

    public TableModelRecipe getRecipe() {
        return tableModelRecipe;
    }

    public void setRecipe(TableModelRecipe tableModelRecipe) {
        this.tableModelRecipe = tableModelRecipe;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = super.equals(object);
        if (result){
            TableModelMB110_1TD that = (TableModelMB110_1TD) object;
            result = holdingRegister0.equals(that.holdingRegister0);
        }
        return result;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getId(), this.getDate(), holdingRegister0);
    }

    @Override
    public String toString() {
        return "TableModelMB110_1TD{" +
                super.toString()+
                "holdingRegister0=" + holdingRegister0 +
                '}';
    }

    @Override
    public TableModelMB110_1TD clone() {
        return (TableModelMB110_1TD) super.clone();
    }
}
