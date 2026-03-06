$gitPath = "C:\Program Files\Git\bin\git.exe"
Set-Location "c:\Users\HP\OneDrive\Desktop\New folder (2)"

Write-Host "Adding remote origin..."
& $gitPath remote add origin https://github.com/sanskriti1019/AI-Invoice-Auditor-.git

Write-Host "Pushing to GitHub..."
& $gitPath push -u origin main
