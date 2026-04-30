<!-- Navbar -->
<div class="navbar-area sticky-top">
    <!-- Menu For Mobile Device -->
    <div class="mobile-nav">
        <a href="{{ route('home') }}" class="logo">
            <img src="{{ asset('assets/img/logo-two.png') }}" alt="Logo">
        </a>
    </div>

    <!-- Menu For Desktop Device -->
    <div class="main-nav">
        <div class="container">
            <nav class="navbar navbar-expand-md navbar-light">
                <a class="navbar-brand" href="{{ route('home') }}">
                    <img src="{{ asset('assets/img/logo.png') }}" class="logo-one" alt="Logo">
                    <img src="{{ asset('assets/img/logo-two.png') }}" class="logo-two" alt="Logo">
                </a>
                <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="#" class="nav-link dropdown-toggle {{ request()->routeIs('home.*') ? 'active' : '' }}">Home <i class="icofont-simple-down"></i></a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <a href="{{ route('home.one') }}" class="nav-link {{ request()->routeIs('home.one') ? 'active' : '' }}">Home Demo One</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('home.two') }}" class="nav-link {{ request()->routeIs('home.two') ? 'active' : '' }}">Home Demo Two</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('home.three') }}" class="nav-link {{ request()->routeIs('home.three') ? 'active' : '' }}">Home Demo Three</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('home.four') }}" class="nav-link {{ request()->routeIs('home.four') ? 'active' : '' }}">Home Demo Four</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link dropdown-toggle {{ request()->routeIs('pages.*') ? 'active' : '' }}">Pages <i class="icofont-simple-down"></i></a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <a href="#" class="nav-link dropdown-toggle">Users <i class="icofont-simple-down"></i></a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <a href="{{ route('login') }}" class="nav-link {{ request()->routeIs('login') ? 'active' : '' }}">Sign In</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{ route('register') }}" class="nav-link {{ request()->routeIs('register') ? 'active' : '' }}">Sign Up</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('gallery') }}" class="nav-link {{ request()->routeIs('gallery') ? 'active' : '' }}">Gallery</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('testimonials') }}" class="nav-link {{ request()->routeIs('testimonials') ? 'active' : '' }}">Testimonials</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('team') }}" class="nav-link {{ request()->routeIs('team') ? 'active' : '' }}">Team</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('faq') }}" class="nav-link {{ request()->routeIs('faq') ? 'active' : '' }}">FAQ</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('error.404') }}" class="nav-link {{ request()->routeIs('error.404') ? 'active' : '' }}">404 Error Page</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('coming-soon') }}" class="nav-link {{ request()->routeIs('coming-soon') ? 'active' : '' }}">Coming Soon</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('privacy-policy') }}" class="nav-link {{ request()->routeIs('privacy-policy') ? 'active' : '' }}">Privacy Policy</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('terms-conditions') }}" class="nav-link {{ request()->routeIs('terms-conditions') ? 'active' : '' }}">Terms & Conditions</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('about') }}" class="nav-link {{ request()->routeIs('about') ? 'active' : '' }}">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link dropdown-toggle {{ request()->routeIs('donations.*') ? 'active' : '' }}">Donations <i class="icofont-simple-down"></i></a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <a href="{{ route('donations.index') }}" class="nav-link {{ request()->routeIs('donations.index') ? 'active' : '' }}">Donations</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('donations.show', 1) }}" class="nav-link {{ request()->routeIs('donations.show') ? 'active' : '' }}">Donation Details</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link dropdown-toggle {{ request()->routeIs('events.*') ? 'active' : '' }}">Events <i class="icofont-simple-down"></i></a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <a href="{{ route('events.index') }}" class="nav-link {{ request()->routeIs('events.index') ? 'active' : '' }}">Events</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('events.show', 1) }}" class="nav-link {{ request()->routeIs('events.show') ? 'active' : '' }}">Event Details</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link dropdown-toggle {{ request()->routeIs('blog.*') ? 'active' : '' }}">Blog <i class="icofont-simple-down"></i></a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <a href="{{ route('blog.index') }}" class="nav-link {{ request()->routeIs('blog.index') ? 'active' : '' }}">Blog</a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ route('blog.show', 1) }}" class="nav-link {{ request()->routeIs('blog.show') ? 'active' : '' }}">Blog Details</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('contact') }}" class="nav-link {{ request()->routeIs('contact') ? 'active' : '' }}">Contact</a>
                        </li>
                    </ul>
                    <div class="side-nav">
                        <a class="donate-btn" href="{{ route('donations.index') }}">
                            Donate
                            <i class="icofont-heart-alt"></i>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</div>
<!-- End Navbar -->