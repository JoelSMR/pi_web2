package com.example.provedores.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(path = "api/v1/provedor")
public class ProvedorController {

    @Autowired
    private ProvedorService provedorService;

    @GetMapping
    public List<provedor> getAll() {
        return provedorService.getProvedor();
    }

    @GetMapping("/{provedorId}")
    public Optional <Provedor> getBId (@PathVariable ("provedorId") Long provedorId) {
        return provedorService.getProvedor(provedorId);
    }

    @PostMapping
    public void saveOrUpdate(@RequestBody provedor provedor) {
        provedorService.saveOrUpdate(provedor);
    }

    @DeleteMapping("/{provedorId}")
    public void saveOrUpdate(@PathVariable("provedorId") Long provedorId) {
        provedorService.delete(provedorId);
    }
}
