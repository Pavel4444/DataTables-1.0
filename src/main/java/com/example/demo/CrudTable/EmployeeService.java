package com.example.demo.CrudTable;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
  private static List<Employee> employees = new ArrayList<>();
  static {
    employees.add(new Employee(1, "Antonette", "Ervin Howell", "Antonette@melissa.tv", "010-88992-6593 x09125", "anastasia.net", "dsa"));
    employees.add(new Employee(2, "Samantha", "Leanne Graham", "Samantha@melissa.tv", "010-4998-6593 x09125", "anastasia.net", "fgdsf" ));
    employees.add(new Employee(3, "Karianne", "Romagura Crona", "Karianne@melissa.tv", "010-48915-6593 x09125", "anastasia.net", "fssd" ));
    employees.add(new Employee(4, "Kamren", "Patricia Lebsack", "Kamren@melissa.tv", "010-78156-6593 x09125", "anastasia.net", "jnas" ));
    employees.add(new Employee(5, "Delphine", "Elwyn Skiles", "Delphine@melissa.tv", "010-78915-6593 x09125", "anastasia.net", "bsajq" ));
    employees.add(new Employee(6, "Moriah", "Glenna Reichert", "Moriah@melissa.tv", "010-1556-6593 x09125", "anastasia.net", "asqb" ));
  }
  public List<Employee> findAll() {
    return employees;
  }
  
	public Employee save(Employee employee) {
		
		
		Employee rand =  employees.get(employees.size()-1);
		int prd = (rand.getId()+1);
		
		if (employee.getId() == null) {
			employee.setId(prd);
			employees.add(employee);
		} else {
			deleteById(employee.getId());
			employees.add(employee);
		}
		return employee;
	}

  

public Employee findById(Integer id) {
  for (Employee employee: employees) {
    if (employee.getId() == id) {
      return employee;
    }
  }
  return null;
}
  
  public Employee deleteById(Integer id) {
	    Employee employee = findById(id);
	    if (employee == null)
	      return null;
	    if (employees.remove(employee)) {
	      return employee;
	    }
	    return null;
	  }
  
}