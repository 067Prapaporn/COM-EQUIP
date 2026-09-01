document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            
            // Allow programmatic switching using the same logic
            switchPage(targetId);
        });
    });

    // Quantity Controls Logic
    const qtyControls = document.querySelectorAll('.qty-control');
    qtyControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('input');

        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                if (val > 0) {
                    input.value = val - 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                input.value = val + 1;
            });
        }
    });

    // Status Table Filtering Logic
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('status-search-input');
    const btnSearch = document.getElementById('btn-search-status');
    const btnReset = document.getElementById('btn-reset-status');
    const tableRows = document.querySelectorAll('#status-data-table tbody tr');

    function filterTable() {
        const selectedCategory = categoryFilter ? categoryFilter.value : 'ทั้งหมด';
        const selectedStatus = statusFilter ? statusFilter.value : 'ทั้งหมด';
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

        tableRows.forEach(row => {
            const name = (row.getAttribute('data-name') || '').toLowerCase();
            const category = row.getAttribute('data-category') || '';
            const status = row.getAttribute('data-status') || '';

            const matchCategory = (selectedCategory === 'ทั้งหมด' || category.includes(selectedCategory));
            const matchStatus = (selectedStatus === 'ทั้งหมด' || status === selectedStatus);
            const matchSearch = (!searchText || name.includes(searchText) || category.toLowerCase().includes(searchText));

            if (matchCategory && matchStatus && matchSearch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (categoryFilter) categoryFilter.addEventListener('change', filterTable);
    if (statusFilter) statusFilter.addEventListener('change', filterTable);
    if (searchInput) searchInput.addEventListener('input', filterTable);
    if (btnSearch) btnSearch.addEventListener('click', filterTable);
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (categoryFilter) categoryFilter.value = 'ทั้งหมด';
            if (statusFilter) statusFilter.value = 'ทั้งหมด';
            if (searchInput) searchInput.value = '';
            filterTable();
        });
    }
});

// Global function to switch pages (can be called from buttons/links)
window.switchPage = function(targetId) {
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');

    // Remove active class from all nav items
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('data-target') === targetId) {
            nav.classList.add('active');
        }
    });

    // Hide all sections, show target
    pageSections.forEach(section => {
        section.classList.remove('active');
        if (section.getAttribute('id') === targetId) {
            section.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
};

// Equipment Dataset for Modal
const equipmentData = {
    'MOU-001': {
        title: 'เมาส์ hp',
        code: 'MOU-001',
        statusText: 'พร้อมใช้งาน',
        badgeClass: 'badge-green',
        stock: '12/15 ชิ้น',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80',
        desc: 'เมาส์ออปติคัล ความละเอียดสูง สัมผัสกระชับมือ เชื่อมต่อแบบ USB-A ความยาวสาย 1.5 เมตร ใช้งานได้ลื่นไหลทุกพื้นผิว'
    },
    'KEY-001': {
        title: 'คีย์บอร์ด',
        code: 'KEY-001',
        statusText: 'พร้อมใช้งาน',
        badgeClass: 'badge-green',
        stock: '8/10 ชิ้น',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=300&q=80',
        desc: 'คีย์บอร์ดมาตรฐาน แบบมีสาย ปุ่มกดนุ่ม เงียบ ตอบสนองได้รวดเร็ว รองรับการใช้งานภาษาไทยและอังกฤษ'
    },
    'PRO-001': {
        title: 'โปรเจกเตอร์ epson',
        code: 'PRO-001',
        statusText: 'กำลังถูกยืม',
        badgeClass: 'badge-yellow',
        stock: '2/4 ชิ้น',
        image: 'https://shop-image.readyplanet.com/o5i15Qd4d2aqqJtPRG5rNWBcmK8=/38a84492f7054becbb93c5a3dbdce215',
        desc: 'โปรเจกเตอร์ความคมชัดสูง 3LCD ความสว่าง 3,600 Lumens รองรับพอร์ต HDMI และ VGA เหมาะสำหรับงานนำเสนอในห้องเรียน'
    },
    'LAV-001': {
        title: 'สายแลน LAN',
        code: 'LAV-001',
        statusText: 'พร้อมใช้งาน',
        badgeClass: 'badge-green',
        stock: '20/25 เส้น',
        image: 'https://image.makewebcdn.com/makeweb/m_1920x0/LqL4C2aWe/product_02/techgear_cat6_ethernet_lan_cable_cord_20_meter_original_imaf9ggz9zqp74y4.png',
        desc: 'สายแลน CAT6 ความยาว 20 เมตร รับส่งข้อมูลความเร็วสูงถึง 1Gbps เคลือบฉนวนป้องกันสัญญาณรบกวน ทนทานใช้งานได้ยาวนาน'
    },
    'HDM-001': {
        title: 'สาย HDMI 5 เมตร',
        code: 'HDM-001',
        statusText: 'ไม่พร้อมใช้งาน',
        badgeClass: 'badge-red',
        stock: '0/7 ชิ้น',
        image: 'https://inwfile.com/s-ds/sjwj1d.jpg',
        desc: 'สาย HDMI ความยาว 5 เมตร รองรับความละเอียด 4K Ultra HD สัญญาณภาพและเสียงคมชัดระดับสูง'
    }
};

let currentModalCode = '';

window.openEquipmentModal = function(code) {
    const data = equipmentData[code];
    if (!data) return;

    currentModalCode = code;
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-code').textContent = data.code;
    document.getElementById('modal-stock').textContent = data.stock;
    document.getElementById('modal-desc-text').textContent = data.desc;

    const badgeEl = document.getElementById('modal-badge');
    badgeEl.textContent = data.statusText;
    badgeEl.className = 'badge ' + data.badgeClass;

    document.getElementById('equipment-modal').style.display = 'flex';
};

window.closeEquipmentModal = function() {
    document.getElementById('equipment-modal').style.display = 'none';
};

window.borrowCurrentModalItem = function() {
    closeEquipmentModal();
    switchPage('borrow');
};

// Helper date formatter
function formatThaiDate(dateStr) {
    if (!dateStr) return '-';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parseInt(parts[0]) + 543}`;
    }
    return dateStr;
}

// Clear Borrow Form
window.clearBorrowForm = function() {
    const ids = ['borrow-user-id', 'borrow-fullname', 'borrow-department', 'borrow-phone', 'borrow-purpose', 'borrow-start-date', 'borrow-end-date', 'borrow-note'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.querySelectorAll('#borrow .qty-control input').forEach(input => input.value = 0);
};

// Submit Borrow Form
window.submitBorrowForm = function() {
    const userId = (document.getElementById('borrow-user-id')?.value || '').trim();
    const fullname = (document.getElementById('borrow-fullname')?.value || '').trim();
    const department = (document.getElementById('borrow-department')?.value || '').trim();
    const phone = (document.getElementById('borrow-phone')?.value || '').trim();
    const purpose = document.getElementById('borrow-purpose')?.value || '';
    const startDate = document.getElementById('borrow-start-date')?.value || '';
    const endDate = document.getElementById('borrow-end-date')?.value || '';

    if (!userId || !fullname || !department || !phone || !purpose || !startDate || !endDate) {
        alert('กรุณากรอกข้อมูลผู้ยืม และเลือกวัตถุประสงค์รวมถึงวันที่ให้ครบถ้วน!');
        return;
    }

    // Collect selected items
    const selectedItems = [];
    const rows = document.querySelectorAll('#borrow .selection-table .table-row');
    rows.forEach(row => {
        const nameEl = row.querySelector('.col-name');
        const codeEl = row.querySelector('.col-id');
        const imgEl = row.querySelector('.col-img img');
        const qtyInput = row.querySelector('.qty-control input');
        const qty = parseInt(qtyInput ? qtyInput.value : 0);

        if (qty > 0 && nameEl && codeEl) {
            selectedItems.push({
                name: nameEl.textContent.trim(),
                code: codeEl.textContent.trim(),
                img: imgEl ? imgEl.src : '',
                qty: qty
            });
        }
    });

    if (selectedItems.length === 0) {
        alert('กรุณาเลือกจำนวนอุปกรณ์ที่ต้องการยืมอย่างน้อย 1 รายการ (กดปุ่ม + บนรายการอุปกรณ์)');
        return;
    }

    // Add to Status Table dynamically
    const statusTableBody = document.querySelector('#status-data-table tbody');
    if (statusTableBody) {
        selectedItems.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-name', item.name);
            newRow.setAttribute('data-category', item.name);
            newRow.setAttribute('data-status', 'ถูกยืม');

            newRow.innerHTML = `
                <td>
                    <div class="td-device">
                        <img src="${item.img}" alt="${item.name}">
                        <span>${item.name} (${item.qty} ชิ้น)</span>
                    </div>
                </td>
                <td>${item.code}</td>
                <td><span class="badge badge-yellow">ถูกยืม</span></td>
                <td>${fullname}</td>
                <td>${formatThaiDate(startDate)}</td>
                <td>${formatThaiDate(endDate)}</td>
            `;
            statusTableBody.prepend(newRow);
        });
    }

    // Show Success Modal Popup
    const detailsHtml = `
        <p><strong>ผู้ยืม:</strong> ${fullname} (รหัส: ${userId})</p>
        <p><strong>แผนก/สาขา:</strong> ${department} | <strong>โทร:</strong> ${phone}</p>
        <p><strong>รายการอุปกรณ์ที่ยืม:</strong> ${selectedItems.map(i => i.name + ' (' + i.qty + ' ชิ้น)').join(', ')}</p>
        <p><strong>วันที่ยืม:</strong> ${formatThaiDate(startDate)} | <strong>กำหนดคืน:</strong> ${formatThaiDate(endDate)}</p>
    `;

    document.getElementById('success-modal-title').textContent = 'บันทึกการยืมอุปกรณ์สำเร็จ!';
    document.getElementById('success-modal-message').textContent = 'ระบบได้บันทึกข้อมูลการยืมอุปกรณ์ลงในตารางสถานะเรียบร้อยแล้ว';
    document.getElementById('success-modal-details').innerHTML = detailsHtml;
    document.getElementById('success-modal').style.display = 'flex';

    clearBorrowForm();
};

// Clear Return Form
window.clearReturnForm = function() {
    const ids = ['return-borrow-id', 'return-borrower-name', 'return-device-name', 'return-borrow-date', 'return-due-date', 'return-actual-date', 'return-condition', 'return-note'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
};

// Search / Select item to return
window.selectItemToReturn = function(code, name, borrowDate, dueDate) {
    document.getElementById('return-borrow-id').value = 'RET-' + code;
    document.getElementById('return-borrower-name').value = 'ปภาพร';
    document.getElementById('return-device-name').value = name + ' (' + code + ')';
    document.getElementById('return-borrow-date').value = '2024-05-15';
    document.getElementById('return-due-date').value = '2024-05-22';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('return-actual-date').value = today;
    document.getElementById('return-condition').value = 'ปกติ';
};

window.searchReturnBorrow = function() {
    const id = (document.getElementById('return-borrow-id')?.value || '').trim();
    if (!id) {
        alert('กรุณากรอกรหัสการยืม หรือ เลือกคลิก "คืน" จากรายการตารางด้านขวา');
        return;
    }
    selectItemToReturn('MOU-001', 'เมาส์ hp', '15/02/2024', '22/05/2024');
};

// Submit Return Form
window.submitReturnForm = function() {
    const borrowId = (document.getElementById('return-borrow-id')?.value || '').trim();
    const borrowerName = (document.getElementById('return-borrower-name')?.value || '').trim();
    const condition = document.getElementById('return-condition')?.value || '';

    if (!borrowId || borrowerName === '-' || !borrowerName || !condition) {
        alert('กรุณากรอกรหัสการยืม หรือเลือกรายการที่ต้องการคืนให้ครบถ้วน!');
        return;
    }

    const deviceName = document.getElementById('return-device-name')?.value || '-';

    const detailsHtml = `
        <p><strong>รหัสการยืม:</strong> ${borrowId}</p>
        <p><strong>ผู้คืน:</strong> ${borrowerName}</p>
        <p><strong>อุปกรณ์ที่คืน:</strong> ${deviceName}</p>
        <p><strong>สภาพอุปกรณ์เมื่อคืน:</strong> ${condition}</p>
    `;

    document.getElementById('success-modal-title').textContent = 'บันทึกการคืนอุปกรณ์สำเร็จ!';
    document.getElementById('success-modal-message').textContent = 'ระบบได้บันทึกการคืนอุปกรณ์เรียบร้อยแล้ว';
    document.getElementById('success-modal-details').innerHTML = detailsHtml;
    document.getElementById('success-modal').style.display = 'flex';

    clearReturnForm();
};

let successModalTargetPage = 'home';

window.closeSuccessModal = function(targetPage) {
    const modal = document.getElementById('success-modal');
    if (modal) modal.style.display = 'none';
    const destination = targetPage || successModalTargetPage || 'home';
    switchPage(destination);
};

// Admin User Profile Dropdown Logic
window.toggleUserDropdown = function(e) {
    e.stopPropagation();
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) {
        menu.style.display = (menu.style.display === 'none' || !menu.style.display) ? 'block' : 'none';
    }
};

// Close dropdown when clicking anywhere outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('user-dropdown-menu');
    const wrapper = document.querySelector('.user-profile-wrapper');
    if (menu && wrapper && !wrapper.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// Admin Modal Information
window.openAdminModal = function(type) {
    const titleEl = document.getElementById('success-modal-title');
    const msgEl = document.getElementById('success-modal-message');
    const detailsEl = document.getElementById('success-modal-details');

    if (type === 'profile') {
        titleEl.textContent = 'ข้อมูลส่วนตัวผู้ดูแลระบบ';
        msgEl.textContent = 'รายละเอียดบัญชีผู้ใช้งานของคุณ';
        detailsEl.innerHTML = `
            <p><strong>ชื่อ-นามสกุล:</strong> ผู้ดูแลระบบ (System Administrator)</p>
            <p><strong>อีเมล:</strong> admin@comequip.ac.th</p>
            <p><strong>ตำแหน่ง:</strong> เจ้าหน้าที่เทคโนโลยีสารสนเทศ</p>
            <p><strong>สิทธิ์การใช้งาน:</strong> สิทธิ์จัดการระบบสูงสุด (Super Admin)</p>
        `;
    } else if (type === 'settings') {
        titleEl.textContent = 'ตั้งค่าระบบ';
        msgEl.textContent = 'การตั้งค่าระบบยืม-คืนอุปกรณ์คอมพิวเตอร์';
        detailsEl.innerHTML = `
            <p><strong>ระยะเวลาการยืมสูงสุด:</strong> 7 วันทำการ</p>
            <p><strong>ระบบแจ้งเตือน:</strong> เปิดใช้งาน (Email & LINE Notify)</p>
            <p><strong>การบันทึก Log:</strong> เปิดใช้งานบันทึกประวัติยืม-คืน</p>
            <p><strong>เวอร์ชันระบบ:</strong> v2.4.0 (Latest)</p>
        `;
    } else if (type === 'reports') {
        titleEl.textContent = 'รายงานสรุปการยืม-คืน';
        msgEl.textContent = 'สรุปข้อมูลสถิติประวัติการใช้งานประจำเดือน';
        detailsEl.innerHTML = `
            <p><strong>จำนวนการยืมอุปกรณ์ทั้งหมด:</strong> 48 ครั้ง</p>
            <p><strong>อุปกรณ์ที่พร้อมใช้งาน:</strong> 42 ชิ้น</p>
            <p><strong>อุปกรณ์ที่ถูกยืมอยู่ในขณะนี้:</strong> 6 ชิ้น</p>
            <p><strong>อุปกรณ์ที่ไม่พร้อมใช้งาน/ชำรุด:</strong> 2 ชิ้น</p>
        `;
    }
    successModalTargetPage = 'home';
    document.getElementById('success-modal').style.display = 'flex';
};

// Global Auth State
let isLoggedIn = true;
let currentUser = {
    name: 'ผู้ดูแลระบบ',
    role: 'Admin',
    email: 'admin@comequip.ac.th'
};

function updateAuthState() {
    const loginBtn = document.getElementById('btn-login-trigger');
    const profileTrigger = document.getElementById('user-profile-trigger');

    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileTrigger) profileTrigger.style.display = 'flex';

        const nameSpan = document.getElementById('current-user-name');
        const dropName = document.getElementById('dropdown-user-name');
        const dropEmail = document.getElementById('dropdown-user-email');

        if (nameSpan) nameSpan.textContent = currentUser.name;
        if (dropName) dropName.textContent = `${currentUser.name} (${currentUser.role})`;
        if (dropEmail) dropEmail.textContent = currentUser.email;
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (profileTrigger) profileTrigger.style.display = 'none';
    }
}

// Open / Close Login Modal
window.openLoginModal = function() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.style.display = 'flex';
};

window.closeLoginModal = function() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.style.display = 'none';
};

// Login Submit Handler
window.handleLoginSubmit = function(e) {
    if (e) e.preventDefault();
    const userVal = (document.getElementById('login-username')?.value || '').trim();
    const passVal = (document.getElementById('login-password')?.value || '').trim();

    if (!userVal || !passVal) {
        alert('กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน!');
        return;
    }

    isLoggedIn = true;
    currentUser.name = (userVal.toLowerCase() === 'admin') ? 'ผู้ดูแลระบบ' : userVal;
    currentUser.email = userVal.includes('@') ? userVal : `${userVal}@comequip.ac.th`;

    updateAuthState();
    closeLoginModal();

    // Show Login Success Alert
    document.getElementById('success-modal-title').textContent = 'เข้าสู่ระบบสำเร็จ!';
    document.getElementById('success-modal-message').textContent = `ยินดีต้อนรับคุณ ${currentUser.name} เข้าสู่ระบบ COM-EQUIP`;
    document.getElementById('success-modal-details').innerHTML = `
        <p><strong>ผู้ใช้งาน:</strong> ${currentUser.name}</p>
        <p><strong>อีเมล:</strong> ${currentUser.email}</p>
        <p><strong>ระดับสิทธิ์:</strong> ผู้ดูแลระบบ (Administrator)</p>
    `;
    document.getElementById('success-modal').style.display = 'flex';
};

// Logout handler
window.logoutAdmin = function() {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
        isLoggedIn = false;
        updateAuthState();
        const menu = document.getElementById('user-dropdown-menu');
        if (menu) menu.style.display = 'none';

        document.getElementById('success-modal-title').textContent = 'ออกจากระบบเรียบร้อยแล้ว';
        document.getElementById('success-modal-message').textContent = 'คุณได้ออกจากระบบแล้ว สามารถเข้าสู่ระบบใหม่ได้ตลอดเวลา';
        document.getElementById('success-modal-details').innerHTML = `<p>สถานะปัจจุบัน: <strong>ผู้เยี่ยมชม (Guest)</strong></p>`;
        document.getElementById('success-modal').style.display = 'flex';
    }
};
