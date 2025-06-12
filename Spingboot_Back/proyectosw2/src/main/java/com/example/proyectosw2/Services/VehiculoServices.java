package com.example.proyectosw2.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proyectosw2.Entity.VehiculoEntity;
import com.example.proyectosw2.Repository.VehiculoRepository;
import com.example.proyectosw2.dto.VehiculoInput;

@Service
public class VehiculoServices {
    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<VehiculoEntity> obtenerVehiculos() {
        return vehiculoRepository.findAll();
    }

    public VehiculoEntity crearVehiculo(VehiculoInput input) {
        VehiculoEntity nuevoVehiculo = VehiculoEntity.builder()
                .marca(input.getMarca())
                .modelo(input.getModelo())
                .anio(input.getAnio())
                .color(input.getColor())
                .placa(input.getPlaca())
                .tipo(input.getTipo())
                .estado(input.getEstado())
                .usuario_id(input.getUsuario_id())
                .build();

        return vehiculoRepository.save(nuevoVehiculo);
    }
}
