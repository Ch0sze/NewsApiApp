import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) {
    const savedCategory = localStorage.getItem('selectedCategory') || 'business';
    this.form = this.fb.group({
      selectedCategory: [savedCategory], // Set a default category if needed
    });
  }



  dismiss() {
    const selectedCategoryControl = this.form.get('selectedCategory');
    if (selectedCategoryControl) {
      const selectedCategory = selectedCategoryControl.value;
      // Save the selected category to localStorage
      localStorage.setItem('selectedCategory', selectedCategory);
      this.settingsService.setSelectedCategory(selectedCategory);
    }
    this.modalCtrl.dismiss();
  }

}
