package com.example.proyectosw2.Entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "vehiculos")
public class VehiculoEntity {
    @Id
    private ObjectId id; // requiere: import org.bson.types.ObjectId;
    private String marca;
    private String modelo;
    private Integer anio;
    private String color;
    private String placa;
    private String tipo; // Por ejemplo: "Sedán", "SUV", "Camioneta", etc.
    private String estado; // Por ejemplo: "Disponible", "En uso", "Mantenimiento"
    private String usuario_id; // ID del propietario del vehículo
}
