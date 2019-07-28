package com.jcsvall.app.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class PrincipalController {
	@GetMapping("getLocation")
	public ResponseEntity<String> getLocation(@RequestParam(value = "name", defaultValue = "World") String name) {
		String retorno = LeerArchivo();
		return new ResponseEntity<String>(retorno, HttpStatus.OK);
	}

	
	@GetMapping("saveLocation")
	public ResponseEntity<String> saveLocation(@RequestParam(value = "latitude") Double latitude,
			@RequestParam(value = "longitude") Double longitude) {

		String retorno = "latitude: " + latitude + " longitude: " + longitude;
		escribirArchivo(latitude + "," + longitude + ",Date: " + new Date() + "\n");
		return new ResponseEntity<String>(retorno, HttpStatus.OK);

	}
	
	@GetMapping("test")
	public ResponseEntity<String> test() {

		String retorno = "Todo bien, OK";
		return new ResponseEntity<String>(retorno, HttpStatus.OK);

	}
	

	public void escribirArchivo(String texto) {
		File archivo = new File("localizacion.txt");
		try {
			// Crear objeto FileWriter que sera el que nos ayude a escribir sobre archivo
			FileWriter escribir = new FileWriter(archivo, true);
			// Escribimos en el archivo con el metodo write
			escribir.write(texto);
			// Cerramos la conexion
			escribir.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String LeerArchivo() {
		// Creamos un String que va a contener todo el texto del archivo
		String texto = "";
		List<String> fileList = new ArrayList<>();
		try {
			// Creamos un archivo FileReader que obtiene lo que tenga el archivo
			FileReader lector = new FileReader("localizacion.txt");

			// El contenido de lector se guarda en un BufferedReader
			BufferedReader contenido = new BufferedReader(lector);

			// Con el siguiente ciclo extraemos todo el contenido del objeto "contenido" y
			// lo mostramos
			String data = "";
			int cantidad=0;
			while ((data = contenido.readLine()) != null) {
				fileList.add(data);
				cantidad++;
			}

			if (!fileList.isEmpty()) {
				texto = fileList.get(fileList.size() - 1);
			}
            System.out.println("cantidad: "+cantidad);
			if(cantidad>11) {
				File archivo = new File("localizacion.txt");
				archivo.delete();
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return texto;
	}

}
