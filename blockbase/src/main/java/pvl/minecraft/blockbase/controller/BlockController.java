package pvl.minecraft.blockbase.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BlockController {

    @RequestMapping("/block/add")
    public String form() {
        return "add";
    }
}
