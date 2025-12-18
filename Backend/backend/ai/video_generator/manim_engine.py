from manim import *

class MathAnimationGenerator:
    def create_equation_solution(self, equation, steps):
        # Generate animated solution
        scene = self._setup_scene()
        
        for i, step in enumerate(steps):
            self._animate_step(scene, step, i)
        
        # Render video
        video_path = self._render_video(scene)
        return video_path
    
    def _animate_step(self, scene, step, index):
        # Create animation for each step
        text = Text(step, font_size=24)
        scene.play(Write(text))
        scene.wait(1)