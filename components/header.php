<header class="main-header">
  <nav class="main-nav">
    <a href="index.php" class="logo">
      <span class="logo-text">Dr. Silvia Dumitrescu</span>
    </a>
    
    <div class="nav-menu">
      <a href="index.php" <?php echo ($currentPage == 'home') ? 'class="active"' : ''; ?>>Acasă</a>
      <a href="despre.php" <?php echo ($currentPage == 'despre') ? 'class="active"' : ''; ?>>Despre mine</a>
      <a href="servicii.php" <?php echo ($currentPage == 'servicii') ? 'class="active"' : ''; ?>>Servicii medicale</a>
      <a href="programare.php" <?php echo ($currentPage == 'programare') ? 'class="active"' : ''; ?>>Programare</a>
      <a href="recenzii.php" <?php echo ($currentPage == 'recenzii') ? 'class="active"' : ''; ?>>Recenzii</a>
    </div>
    
    <div class="language-switcher">
      <button class="lang-btn" data-lang="ro">RO</button>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
  </nav>
</header>
