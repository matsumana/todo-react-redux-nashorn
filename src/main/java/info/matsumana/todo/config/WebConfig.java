package info.matsumana.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

@Configuration
public class WebConfig {

    @Bean
    public ViewResolver viewResolver() {
        ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();
        viewResolver.setPrefix("/templates/");
        viewResolver.setSuffix(".ejs");
        return viewResolver;
    }

    @Bean
    public ScriptTemplateConfigurer scriptTemplateConfigurer() {
        ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();
        configurer.setEngineName("nashorn");

        // サーバサイドレンダリング時に読み込むソースを指定する
        configurer.setScripts(
                // serverside
                "/javascript/serverside/polyfill.js",
                "/javascript/serverside/render.js",

                // frontend
                "/static/scripts/bundle.js"
        );

        // サーバサイドレンダリングのレンダリング処理時に呼ぶ関数を指定する
        // render関数は src/main/resources/javascript/serverside/render.js にある
        configurer.setRenderFunction("render");

        // Reactはスレッドセーフじゃないのでfalseにする
        configurer.setSharedEngine(false);

        return configurer;
    }
}
