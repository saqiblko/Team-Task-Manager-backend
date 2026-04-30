<!DOCTYPE html>
<html lang="zxx">

<head>
    <!--=== Meta Tags ===-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--=== Title & Favicon ===-->
    <title>@yield('title', 'Institute for water and climate initiatives - Home')</title>
    <link rel="icon" type="image/png" href="{{ asset('storage/'.$setting->favicon) }}">

    <!--=== Link of CSS ===-->
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/icofont.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/meanmenu.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/modal-video.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/fonts/flaticon.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/animate.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/lightbox.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/owl.theme.default.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/odometer.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/nice-select.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/responsive.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/theme-dark.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">


    @stack('styles')
</head>

<body>
    <!-- Preloader -->
    {{-- <div class="loader">
        <div class="d-table">
            <div class="d-table-cell">
                <div class="pre-box-one">
                    <div class="pre-box-two"></div>
                </div>
            </div>
        </div>
    </div> --}}
    <!-- End Preloader -->

    <!-- Header -->
    {{-- <div class="header-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="left">
                        <ul>
                            <li>
                                <i class="icofont-location-pin"></i>
                                <a href="#">6B, Helvetica street, Jordan</a>
                            </li>
                            <li>
                                <i class="icofont-ui-call"></i>
                                <a href="tel:0123456987">+0123-456-987</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="right">
                        <ul>
                            <li>
                                <span>Follow Us:</span>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/" target="_blank">
                                    <i class="icofont-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/" target="_blank">
                                    <i class="icofont-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" target="_blank">
                                    <i class="icofont-youtube-play"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" target="_blank">
                                    <i class="icofont-instagram"></i>
                                </a>
                            </li>
                        </ul>
                        <div class="language">
                            <select>
                                <option>English</option>
                                <option>العربيّة</option>
                                <option>Deutsch</option>
                                <option>Português</option>
                            </select>
                        </div>
                        <div class="header-search">
                            <i id="search-btn" class="icofont-search-2"></i>
                            <div id="search-overlay" class="block">
                                <div class="centered">
                                    <div id="search-box">
                                        <i id="close-btn" class="icofont-close"></i>
                                        <form>
                                            <input type="text" class="form-control" placeholder="Search..."/>
                                            <button type="submit" class="btn">Search</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> --}}
    <!-- End Header -->

    <!-- Navbar -->
    <div class="navbar-area sticky-top">
        <!-- Menu For Mobile Device -->
        <div class="mobile-nav">
            <a href="{{ url('/') }}" class="logo">
                <img src="{{ asset('assets/img/logo-two.png') }}" alt="Logo">
            </a>
        </div>

        <!-- Menu For Desktop Device -->
        <div class="main-nav">
            <div class="side-nav d-flex justify-content-end">
                {{-- <div class="btn-wrapper">
                    <button class="btn donate-button">
                        <span class="btn-txt">SUPPORT A CAUSE</span>
                        <div class="dot pulse"></div>
                    </button>
                </div> --}}
            </div>

            <style>
                .btn-wrapper {
                    --width: 250px;
                    --height: 50px;
                    --padding: 8px;
                    --border-radius: 24px;
                    --dot-size: 8px;
                    --btn-color: #e4e4e4;
                    --hue: 142deg;
                    --animation-duration: 1.2s;

                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: var(--width);
                    height: var(--height);
                    border-radius: var(--border-radius);
                    border: none;

                    background-color: #00000008;

                    box-shadow:
                        1px 1px 2px 0 #fffd,
                        2px 2px 2px #0001 inset,
                        2px 2px 4px #0001 inset,
                        2px 2px 8px #0001 inset;

                    transition: box-shadow 50ms linear;

                    perspective: 150px;
                    perspective-origin: center;

                    user-select: none;
                    z-index: 1;
                }

                .btn-wrapper .btn {
                    display: flex;
                    align-items: center;
                    justify-content: start;
                    gap: 0.25em;
                    text-align: left;
                    padding: 0 var(--height) 0 calc(var(--padding) * 2);

                    width: calc(100% - 2 * var(--padding));
                    height: calc(100% - 2 * var(--padding));
                    border-radius: calc(var(--border-radius) - var(--padding));
                    border: none;
                    cursor: pointer;

                    background: linear-gradient(#fff2, #0001), var(--btn-color);

                    box-shadow:
                        1px 1px 2px -1px #fff inset,
                        0 2px 1px #00000010,
                        0 4px 2px #00000010,
                        0 8px 4px #00000010,
                        0 16px 8px #00000010,
                        0 32px 16px #00000010;

                    transition:
                        transform 0.25s cubic-bezier(0.25, 1.5, 0.5, 2.2),
                        box-shadow 0.25s cubic-bezier(0.25, 1.5, 0.5, 1),
                        filter 0.3s cubic-bezier(0.25, 1.5, 0.5, 1);
                    will-change: transform, filter;

                    z-index: 2;
                }

                .btn-wrapper .btn-txt {
                    display: inline-block;

                    font-size: 16px;
                    font-weight: 500;
                    font-family: "Calibri Light", "Calibri", "Segoe UI", "Helvetica Neue", Arial, sans-serif;


                    color: #5550;
                    background-image: linear-gradient(#000a, #555);
                    background-clip: text;
                    filter: drop-shadow(0 1px 0px #fff) drop-shadow(0 -1px 0px #0005);
                }



                .btn-wrapper .dot {
                    position: absolute;
                    top: calc(50% - var(--dot-size) / 2);
                    right: calc(var(--height) / 2 - var(--padding) / 2);
                    width: var(--dot-size);
                    aspect-ratio: 1 / 1;
                    border-radius: 50%;
                    background-color: hsla(var(--hue), 0%, 50%, 0.1);

                    border: 1px solid hsla(var(--hue), 0%, 60%, 0.6);
                    box-sizing: border-box;

                    box-shadow:
                        1px 1px 2px -1px #fffe inset,
                        0 2px 1px #00000010,
                        0 4px 2px #00000010,
                        0 8px 4px #00000010;

                    pointer-events: none;
                    z-index: 3;
                }

                .btn-wrapper .dot::before {
                    content: "";
                    position: absolute;
                    top: calc(var(--padding) / -2);
                    left: calc(var(--padding) / -2);
                    width: calc(100% + var(--padding));
                    height: calc(100% + var(--padding));
                    border-radius: inherit;
                    background-color: #0006;
                    mask-image: radial-gradient(circle at 50% 60%, transparent 50%, black);
                }

                .btn-wrapper .dot::after {
                    content: "";
                    position: absolute;
                    top: calc(var(--padding) / -2);
                    left: calc(var(--padding) / -2);
                    width: calc(100% + var(--padding));
                    height: calc(100% + var(--padding));
                    border-radius: inherit;
                    background-color: #0000;

                    box-shadow:
                        0 0 10px 2px hsla(var(--hue), 80%, 50%, 0.3),
                        0 0 20px 10px hsla(var(--hue), 80%, 50%, 0.5),
                        0 0 50px 20px hsla(var(--hue), 80%, 50%, 0.5),
                        0 0 16px 1px hsla(var(--hue), 100%, 60%, 0.9) inset;

                    opacity: 0;
                }

                .btn-wrapper .pulse {
                    transition: transform 200ms ease-in;

                    &.dot {
                        animation: bg-anim var(--animation-duration) ease-in-out infinite;
                    }

                    &::after {
                        animation: opacity-anim var(--animation-duration) ease-in-out infinite;
                    }
                }

                @keyframes bg-anim {

                    0%,
                    100% {
                        background-color: hsla(var(--hue), 50%, 50%, 0);
                    }

                    50% {
                        background-color: hsla(var(--hue), 100%, 50%, 1);
                    }
                }

                @keyframes opacity-anim {

                    0%,
                    100% {
                        opacity: 0;
                    }

                    50% {
                        opacity: 1;
                    }
                }

                .btn-wrapper .btn:hover,
                .btn:focus-visible {
                    filter: drop-shadow(var(--padding) 0 var(--padding) hsla(var(--hue), 70%, 60%, 0.6));
                    transform: translate3d(0, -2px, 2px);

                    .btn-txt {
                        background-color: hsla(var(--hue), 50%, 50%, 1);
                        background-image: none;
                    }

                    .btn-wrapper .pulse {
                        &.dot {
                            animation: none;
                            background-color: hsla(var(--hue), 100%, 50%, 1);
                        }

                        &::after {
                            animation: none;
                            opacity: 1;
                        }
                    }
                }

                .btn-wrapper .btn:focus-visible {
                    outline: 2px dashed hsla(var(--hue), 70%, 40%, 1);
                    outline-offset: var(--padding);
                }

                .btn-wrapper .btn:active {
                    filter: drop-shadow(var(--padding) 0 var(--padding) hsla(var(--hue), 100%, 50%, 1));
                    transform: translate3d(0, 0, -4px);

                    .btn-txt {
                        background-color: hsla(var(--hue), 50%, 50%, 1);
                    }

                    ~.dot {
                        animation-play-state: paused;
                        background-color: hsla(var(--hue), 100%, 50%, 1);
                    }
                }

                .btn-wrapper .btn-wrapper:has(.btn:active) {
                    box-shadow:
                        1px 1px 2px 0 #fff,
                        2px 2px 2px #0001 inset,
                        2px 2px 4px #0001 inset,
                        2px 2px 8px #0001 inset,
                        0 0 32px 2px hsla(var(--hue), 50%, 50%, 0.5) inset;
                }
            </style>
            <div class="container">
                <nav class="navbar navbar-expand-md navbar-light">
                    <a class="navbar-brand" href="{{ route('frontend.index') }}">
                        <img src="{{ asset('storage/'.$setting->logo) }}" width="70%" class="logo-one" alt="Logo">
                        <img src="{{ asset('assets/img/logo-two.png') }}" width="40%" class="logo-two"
                            alt="Logo">
                    </a>
                    <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a href="#" class="nav-link dropdown-toggle active">About <i
                                        class="icofont-simple-down"></i></a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item">
                                        <a href="#about-team" class="nav-link dropdown-toggle">About Us <i
                                                class="icofont-simple-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li class="nav-item">
                                                <a href="{{ route('frontend.our-team') }}" class="nav-link">Our
                                                    Team</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="{{ route('frontend.board-member') }}" class="nav-link">Our
                                                    Board Members</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="{{ route('frontend.advisory-council-member') }}"
                                                    class="nav-link">Our Advisory Council Members</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="{{ route('frontend.policies') }}" class="nav-link">Policies
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.our-partners') }}" class="nav-link">Our
                                            Partners</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.program') }}" class="nav-link">Programs</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.sdgs') }}" class="nav-link">SDG</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.sdgs') }}" class="nav-link">Social media</a>
                                    </li>

                                </ul>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link dropdown-toggle">Our Work <i
                                        class="icofont-simple-down"></i></a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.water') }}" class="nav-link">Water</a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="{{ route('frontend.climate') }}" class="nav-link">Climate</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.health') }}" class="nav-link">Health</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.education') }}" class="nav-link">Education</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.livelihood') }}" class="nav-link">Livelihood</a>
                                    </li>

                                </ul>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link dropdown-toggle">Get Involved <i
                                        class="icofont-simple-down"></i></a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.individual-support') }}"
                                            class="nav-link">Individual Support</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.corporate-responsibility-partnership') }}"
                                            class="nav-link">Corporate Responsibility & Partnerships </a>
                                        {{-- <ul class="dropdown-menu">
                                            <li class="nav-item">
                                                <a href="#individual-support" class="nav-link">Cause Marketing &#038;
                                                    Events</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#corporate-sponsors" class="nav-link">Employee Engagement</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#institutional" class="nav-link">Payroll Giving</a>
                                            </li>
                                        </ul> --}}
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.school-partnership') }}" class="nav-link">School
                                            Partnerships</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.volunteer-internship') }}"
                                            class="nav-link">Volunteers &#038; Internships</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('frontend.work-with-us') }}" class="nav-link">Work With
                                            Us</a>
                                    </li>
                                    {{-- <li class="nav-item">
                                        <a href="{{ route('frontend.policies') }}" class="nav-link">Policies</a>
                                    </li> --}}
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link dropdown-toggle">Resource Center <i
                                        class="icofont-simple-down"></i></a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item">

                                        <a href="{{ asset('assets/img/FirstNewsletterFirstEdition2024-25.pdf') }}"
                                            target="_blank" class="nav-link">
                                            Newsletter
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ asset('assets/img/Firstanualreport2025.pdf') }}" target="_blank"
                                            class="nav-link">
                                            Annual Report
                                        </a>
                                    </li>
                                    {{-- <li class="nav-item">
                                        <a href="#blog" class="nav-link">Blog</a>
                                    </li> --}}
                                    <li class="nav-item">
                                        <a href="#latest-impact" class="nav-link"> Impact Stories</a>
                                    </li>

                                </ul>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('frontend.gallery') }}" class="nav-link">Gallery</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('frontend.contact') }}" class="nav-link">Contact US</a>
                            </li>
                        </ul>

                        <div class="side-nav">
                            <a class="donate-btn" href="#">
                     {{ $setting->donate_text }}
                                <i class="icofont-heart-alt"></i>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <!-- End Navbar -->

    @yield('content')

    <!-- Footer -->
    <footer class="footer-area pt-100">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-lg-6">
                    <div class="footer-item">
                        <div class="footer-logo">
                            <a class="logo" href="{{ url('/') }}">
                                <img src="{{ asset('storage/'.$setting->footer_logo) }}" width="50%" alt="Logo">
                            </a>
                            <p>{{ $setting->footer_about }}</p>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/share/1MR9Aodwew/" target="_blank">
                                        <i class="icofont-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/institute-for-water-and-climate-inititatives/"
                                        target="_blank">
                                        <i class="icofont-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtu.be/uGUVTRUitHg" target="_blank">
                                        <i class="icofont-youtube-play"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/iwci_india?igsh=MXJsbGp3YzViaGZ1NA=="
                                        target="_blank">
                                        <i class="icofont-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {{-- <div class="col-sm-6 col-lg-3">
                    <div class="footer-item">
                        <div class="footer-causes">
                            <h3>Urgent causes</h3>
                            <div class="cause-inner">
                                <ul class="align-items-center">
                                    <li>
                                        <img src="{{ asset('assets/awareness/awareness1.jpeg') }}" alt="Cause">
                                    </li>
                                    <li>
                                        <h3>
                                            <a href="#">Donate for melina the little child</a>
                                        </h3>
                                    </li>
                                </ul>
                            </div>
                            <div class="cause-inner">
                                <ul class="align-items-center">
                                    <li>
                                        <img src="{{ asset('assets/awareness/awareness2.jpeg') }}" alt="Cause">
                                    </li>
                                    <li>
                                        <h3>
                                            <a href="#">Relief for India cyclone effected</a>
                                        </h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> --}}

                <div class="col-sm-6 col-lg-3">
                    <div class="footer-item">
                        <div class="footer-links">
                            <h3>Quick links</h3>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="icofont-simple-right"></i>
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="icofont-simple-right"></i>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="icofont-simple-right"></i>
                                        Events
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="icofont-simple-right"></i>
                                        Donation
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6 col-lg-3">
                    <div class="footer-item">
                        <div class="footer-contact">
                            <h3>Contact info</h3>
                            <div class="contact-inner">
                                <ul>
                                    <li>
                                        <i class="icofont-location-pin"></i>
                                        <a href="#">{{ $setting->address_alt }}</a>
                                    </li>
                                    <li>
                                        <i class="icofont-ui-call"></i>
                                        <a href="tel:{{ $setting->phone }}">{{ $setting->phone }}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="contact-inner">
                                <ul>
                                    <li>
                                        <i class="icofont-location-pin"></i>
                                        <a href="#">{{ $setting->address }}</a>
                                    </li>
                                    <li>
                                        <i class="icofont-email"></i>
                                        <a href="mailto:{{ $setting->email }}">{{ $setting->email }}</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright-area">
                <p style="color: #ffffff">
                    Copyright © {{ date('Y') }} The Institute for Water and Climate.
                    Designed By <a href="https://sofzer.com/" target="_blank">
                        Sofzer Technologies
                    </a>
                </p>
            </div>


        </div>
        </div>
    </footer>
    <!-- End Footer -->

    <!-- Go Top -->
    <div class="go-top">
        <i class="icofont-arrow-up"></i>
        <i class="icofont-arrow-up"></i>
    </div>
    <!-- End Go Top -->

    <!--=== Essential JS ===-->
    <script src="{{ asset('assets/js/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/form-validator.min.js') }}"></script>
    <script src="{{ asset('assets/js/contact-form-script.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.ajaxchimp.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.meanmenu.js') }}"></script>
    <script src="{{ asset('assets/js/jquery-modal-video.min.js') }}"></script>
    <script src="{{ asset('assets/js/wow.min.js') }}"></script>
    <script src="{{ asset('assets/js/lightbox.min.js') }}"></script>
    <script src="{{ asset('assets/js/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('assets/js/odometer.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.appear.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.nice-select.min.js') }}"></script>
    <script src="{{ asset('assets/js/custom.js') }}"></script>

    @stack('scripts')
</body>

</html>
