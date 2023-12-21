// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;
use tauri::{
    AppHandle, CustomMenuItem, Manager, Runtime, SystemTray, SystemTrayEvent, SystemTrayMenu,
};

mod api;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn create_main_window<R: tauri::Runtime>(manager: &impl Manager<R>) -> Result<tauri::Window<R>> {
    let window_builder =
        tauri::WindowBuilder::new(manager, "label", tauri::WindowUrl::App("index.html".into()))
            .inner_size(1280.0, 720.0)
            .resizable(true)
            .fullscreen(false)
            .title("hashnode-tauri")
            .visible(false);

    let window = window_builder.build()?;

    Ok(window)
}

fn show_window(app: &AppHandle<impl Runtime>) {
    let main_window = if let Some(window) = app.get_window("label") {
        window
    } else {
        let window = create_main_window(app).unwrap();
        window.show().unwrap();

        window
    };
    main_window.set_focus().unwrap();
}

fn on_tray_event(app: &AppHandle<impl Runtime>, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            show_window(app);
        }

        SystemTrayEvent::MenuItemClick { id, .. } if id == "show" => {
            show_window(app);
        }

        SystemTrayEvent::MenuItemClick { id, .. } if id == "quit" => {
            app.exit(0);
        }

        _ => {}
    }
}

fn main() -> Result<()> {
    let show_item = CustomMenuItem::new("show", "Show Window"); // TODO tag for translation
    let quit_item = CustomMenuItem::new("quit", "Quit Application"); // TODO tag for translation

    let tray_menu = SystemTrayMenu::new()
        .add_item(show_item)
        .add_item(quit_item);

    let system_tray = SystemTray::new().with_menu(tray_menu);

    let app = tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(on_tray_event)
        .invoke_handler(tauri::generate_handler![greet, api::hashnode::onboard])
        .build(tauri::generate_context!())?;

    let main_window = create_main_window(&app)?;
    main_window.show()?;

    #[cfg(debug_assertions)]
    {
        main_window.open_devtools();
    }

    app.run(|_, event| {
        if let tauri::RunEvent::ExitRequested { api, .. } = event {
            api.prevent_exit();
        }
    });

    Ok(())
}
