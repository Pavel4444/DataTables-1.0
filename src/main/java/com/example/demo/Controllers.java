package com.example.demo;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.List;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.CrudTable.Employee;
import com.example.demo.CrudTable.EmployeeService;

@RestController
public class Controllers {
	
	@Autowired
	  private EmployeeService courseManagementService;
	
  @GetMapping("/api/hello")
  public String hello() {
      return "Hello world";
  }
  
  @GetMapping("/api/employees2/{id}")
	public Employee getEmployee(@PathVariable Integer id) {
		return courseManagementService.findById(id);
	}
  
	@GetMapping("/api/employees2")
	public List<Employee> getAllCourses() {
		return courseManagementService.findAll();
	}
	
	  @PutMapping("/api/employees2/{id}")
	  public ResponseEntity<Employee> updateCourse(@PathVariable Integer id,
	      @RequestBody Employee employee) {
		  Employee employeeUpdated = courseManagementService.save(employee);
	    return new ResponseEntity<Employee>(employeeUpdated, HttpStatus.OK);
	  }
	  
	  @PostMapping("/api/employees2")
	  public ResponseEntity<Void> createEmployee(@RequestBody Employee employee) {
		  Employee createdEmployee = courseManagementService.save(employee);
	    // Location
	    // Get current resource url
	    /// {id}
	    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdEmployee.getId())
	        .toUri();
	    return ResponseEntity.created(uri).build();
	  }
	
	@DeleteMapping("/api/employees2/{id}")
	  public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
	    Employee employee = courseManagementService.deleteById(id);
	    if (employee != null) {
	      return ResponseEntity.noContent().build();
	    }
	    return ResponseEntity.notFound().build();
	  }
	
	
    @GetMapping("/api/corona1")
	public static String getDailyData() throws IOException{

		HttpURLConnection connection = (HttpURLConnection) new URL("https://covid19.mathdro.id/api/daily").openConnection();
		
		connection.setRequestMethod("GET");

		int responseCode = connection.getResponseCode();
		if(responseCode == 200){
			String response = "";
			Scanner scanner = new Scanner(connection.getInputStream());
			while(scanner.hasNextLine()){
				response += scanner.nextLine();
				
			}
			scanner.close();
			return response;

		}
		return "Corona api unavaible";
	}


	    
	    @GetMapping("/api/corona2")
		public static String getCoronaData() throws IOException{

			HttpURLConnection connection = (HttpURLConnection) new URL("https://api.covid19api.com/summary").openConnection();
			
			connection.setRequestMethod("GET");

			int responseCode = connection.getResponseCode();
			if(responseCode == 200){
				String response = "";
				Scanner scanner = new Scanner(connection.getInputStream());
				while(scanner.hasNextLine()){
					response += scanner.nextLine();
					
				}
				scanner.close();
				return response;

			}
			return "Corona api unavaible";
		}
	    
	    
	    
	    
	}
