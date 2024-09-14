// Function to generate resume based on form inputs
function generateResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const summary = (document.getElementById('summary') as HTMLTextAreaElement).value;
    const certifications = (document.getElementById('certifications') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const workExperience = (document.getElementById('workExperience') as HTMLTextAreaElement).value;
    const profileImage = (document.getElementById('profileImage') as HTMLInputElement).files?.[0];

    // Update resume preview with form data
    (document.getElementById('name-output') as HTMLSpanElement).textContent = name;
    (document.getElementById('jobTitle-output') as HTMLSpanElement).textContent = jobTitle;
    (document.getElementById('phone-output') as HTMLSpanElement).textContent = phone;
    (document.getElementById('email-output') as HTMLSpanElement).textContent = email;
    (document.getElementById('location-output') as HTMLSpanElement).textContent = location;
    (document.getElementById('summary-output') as HTMLParagraphElement).textContent = summary;
    (document.getElementById('certification-output') as HTMLParagraphElement).textContent = certifications;
    (document.getElementById('education-output') as HTMLParagraphElement).textContent = education;
    (document.getElementById('skills-output') as HTMLUListElement).innerHTML = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    (document.getElementById('work-experience-output') as HTMLParagraphElement).textContent = workExperience;

    // Handle profile image preview
    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            (document.getElementById('profile-picture-preview') as HTMLImageElement).src = e.target?.result as string;
        };
        reader.readAsDataURL(profileImage);
    }
}

// Function to handle resume sharing
function shareResume(): void {
    const resumeURL = window.location.href; // Use the current URL for sharing
    navigator.clipboard.writeText(resumeURL).then(() => {
        alert('Resume URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy URL: ', err);
    });
}

// Function to handle PDF download using browser print dialog
function downloadPDF(): void {
    window.print(); // This will open the print dialog and allow the user to save as PDF
}

// Add event listeners to buttons
document.getElementById('generateResumeButton')?.addEventListener('click', generateResume);
document.getElementById('shareResumeButton')?.addEventListener('click', shareResume);
document.getElementById('download-pdf')?.addEventListener('click', downloadPDF);

// Handle profile image changes
function handleProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const imgElement = document.getElementById('profile-picture-preview') as HTMLImageElement;
            if (imgElement && e.target) {
                imgElement.src = e.target.result as string;
            }
        };

        reader.readAsDataURL(file);
    } else {
        console.error("Please select a valid image file.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('profileImage') as HTMLInputElement;
    if (profileImageInput) {
        profileImageInput.addEventListener('change', handleProfileImageChange);
    }
});
