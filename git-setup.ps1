$gitPath = "C:\Program Files\Git\bin\git.exe"
Set-Location "c:\Users\HP\OneDrive\Desktop\New folder (2)"

Write-Host "Initializing git repo..."
& $gitPath init

Write-Host "Configuring git user..."
& $gitPath config user.email "user@example.com"
& $gitPath config user.name "AI Invoice Auditor"

Write-Host "Staging all files..."
& $gitPath add .

Write-Host "Committing..."
& $gitPath commit -m "Initial commit - AI Invoice Auditor SaaS Platform"

Write-Host "Setting branch to main..."
& $gitPath branch -M main

Write-Host "Done! Now run: git remote add origin <YOUR_REPO_URL> then git push -u origin main"
