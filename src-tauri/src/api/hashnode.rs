use anyhow::Result;
use serde::Serialize;
use tauri;

#[derive(Default, Serialize)]
pub struct HashnodeOnboard {
    pub username: &'static str,
    pub job: &'static str,
    pub description: &'static str,
    pub image: &'static str,
}

#[tauri::command]
pub fn onboard() -> Result<HashnodeOnboard, tauri::Error> {
    Ok(HashnodeOnboard {
        username: "Guillermo Rauch",
        job: "CEO, Vercel",
        description: "It's amazing to see how fast devs go from 0 to Blog under a domain they own on Hashnode 🤯. It reminds me a lot of what Substack did for journalists.",
        image: "/images/default_profile.png",
    })
}
