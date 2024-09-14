"use strict";
var _a, _b, _c;
// Function to generate resume based on form inputs
function generateResume() {
    var _a;
    const name = document.getElementById('name').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const summary = document.getElementById('summary').value;
    const certifications = document.getElementById('certifications').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const workExperience = document.getElementById('workExperience').value;
    const profileImage = (_a = document.getElementById('profileImage').files) === null || _a === void 0 ? void 0 : _a[0];
    // Update resume preview with form data
    document.getElementById('name-output').textContent = name;
    document.getElementById('jobTitle-output').textContent = jobTitle;
    document.getElementById('phone-output').textContent = phone;
    document.getElementById('email-output').textContent = email;
    document.getElementById('location-output').textContent = location;
    document.getElementById('summary-output').textContent = summary;
    document.getElementById('certification-output').textContent = certifications;
    document.getElementById('education-output').textContent = education;
    document.getElementById('skills-output').innerHTML = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    document.getElementById('work-experience-output').textContent = workExperience;
    // Handle profile image preview
    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            document.getElementById('profile-picture-preview').src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(profileImage);
    }
}
// Function to handle resume sharing
function shareResume() {
    const resumeURL = window.location.href; // Use the current URL for sharing
    navigator.clipboard.writeText(resumeURL).then(() => {
        alert('Resume URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy URL: ', err);
    });
}
// Function to handle PDF download using browser print dialog
function downloadPDF() {
    window.print(); // This will open the print dialog and allow the user to save as PDF
}
// Add event listeners to buttons
(_a = document.getElementById('generateResumeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', generateResume);
(_b = document.getElementById('shareResumeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', shareResume);
(_c = document.getElementById('download-pdf')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', downloadPDF);
// Handle profile image changes
function handleProfileImageChange(event) {
    const input = event.target;
    const file = input.files ? input.files[0] : null;
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = document.getElementById('profile-picture-preview');
            if (imgElement && e.target) {
                imgElement.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
    else {
        console.error("Please select a valid image file.");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('profileImage');
    if (profileImageInput) {
        profileImageInput.addEventListener('change', handleProfileImageChange);
    }
});
